import { delay, getImageDOLink, s3Client, ThrowError } from '@lib/common'
import { Injectable, UploadedFile } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as AWS from 'aws-sdk'
import { ObjectCannedACL } from '@aws-sdk/client-s3'
import * as fs from 'fs'
import * as sharp from 'sharp'
import * as path from 'path'
import { HttpClientService } from '@lib/http-client'

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

@Injectable()
export class MediaService {
  private s3: AWS.S3
  constructor(
    private readonly configService: ConfigService,
    private readonly httpClientService: HttpClientService,
  ) {}

  async handleFile(@UploadedFile() file: any) {
    if (!file) {
      throw new Error('No file provided')
    }

    const link = await this.processImage(file)
    return {
      filename: file.filename,
      link,
    }
  }

  async processImage(file: any): Promise<string> {
    const outputPath = './uploads'
    const outputFilePath = path.join(outputPath, `f-${file.filename}`)

    if (!fs.existsSync(file.path)) {
      throw new Error('File not found')
    }
    const metadata = await sharp(file.path).metadata()
    const ratio = metadata.width / 1000
    await sharp(file.path)
      .rotate()
      // .resize(
      //   Number((metadata.width / ratio).toFixed(0)),
      //   Number((metadata.height / ratio).toFixed(0)),
      // )
      .toFile(outputFilePath)
    // const link = await this.uploadFileToDO(file, outputFilePath)
    const link = `${this.configService.get('global.api_url')}/uploads/f-${file.filename}`
    this.deleteFile(file.path)
    // this.deleteFile(outputFilePath)
    return link
  }

  async processLocalImage(fileName: string, filePath: string): Promise<string> {
    const outputPath = './uploads'
    const outputFilePath = path.join(outputPath, `f-${fileName}`)

    if (!fs.existsSync(filePath)) {
      throw new Error('File not found')
    }
    const metadata = await sharp(filePath).metadata()
    const ratio = metadata.width / 1000
    await sharp(filePath)
      .rotate()
      // .resize(
      //   Number((metadata.width / ratio).toFixed(0)),
      //   Number((metadata.height / ratio).toFixed(0)),
      // )
      .toFile(outputFilePath)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const ext = path.extname(fileName)
    const filename = `${uniqueSuffix}${ext}`
    // const link = await this.uploadFileToDO(
    //   { filename: filename, mimetype: 'image/jpeg' },
    //   outputFilePath,
    // )
    const link = `${this.configService.get('global.api_url')}/uploads/f-${filename}`
    // this.deleteFile(filePath)
    this.deleteFile(outputFilePath)
    return link
  }

  async uploadFileToDO(file: any, filePath: string): Promise<any> {
    try {
      const imageBuffer = await sharp(filePath).toBuffer()
      const uploadParams = {
        Bucket: process.env.DO_SPACES_BUCKET,
        Key: file.filename,
        Body: imageBuffer,
        ACL: ObjectCannedACL.public_read,
        ContentType: file.mimetype,
      }

      await s3Client.putObject(uploadParams)
      return getImageDOLink(uploadParams.Bucket, uploadParams.Key)
    } catch (err) {
      ThrowError('Upload image failed!')
    }
  }

  async detectLicensePlate(@UploadedFile() file: any) {
    if (!file) {
      throw new Error('No file provided')
    }
    const imagePath = path.join(__dirname, `../${file.path}`)
    const compressImagePath = await this.processCompressImage(
      file.filename,
      imagePath,
    )
    const licensePlate =
      await this.httpClientService.detectLicensePlate(compressImagePath)
    this.deleteFile(file.path)
    return licensePlate
  }

  async detectLocalLicensePlate(filePath: string) {
    const imagePath = path.join(__dirname, `../${filePath}`)
    const pathSplit = filePath.split('/')
    const detectImage = await this.processCompressImage(pathSplit[1], imagePath)
    const licensePlate =
      await this.httpClientService.detectLicensePlate(detectImage)
    // this.deleteFile(filePath)
    return licensePlate['license_plate']
  }

  async processCompressImage(
    fileName: string,
    filePath: string,
  ): Promise<string> {
    const outputPath = './uploads'
    const outputFilePath = path.join(outputPath, `f-${fileName}`)

    if (!fs.existsSync(filePath)) {
      throw new Error('File not found')
    }
    const metadata = await sharp(filePath).metadata()
    const ratio = metadata.width / 1000
    await sharp(filePath)
      .rotate()
      // .resize(
      //   Number((metadata.width / ratio).toFixed(0)),
      //   Number((metadata.height / ratio).toFixed(0)),
      // )
      .toFile(outputFilePath)
    return path.join(__dirname, `../${outputFilePath}`)
  }

  deleteFile(filePath: string) {
    fs.unlink(filePath, (err) => {
      if (err) {
        if (err.code === 'ENOENT') {
          ThrowError(`File ${filePath} not found`)
        } else {
          throw err
        }
      }
    })
  }
}
