import { regexLicensePlate, ThrowError } from '@lib/common'
import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AxiosError } from '@nestjs/terminus/dist/errors/axios.error'
import { catchError, firstValueFrom } from 'rxjs'
const fs = require('fs')
const { spawn } = require('child_process')
const FormData = require('form-data')

@Injectable()
export class HttpClientService {
  private readonly logger = new Logger(HttpClientService.name)
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async detectLicensePlate(imagePath: string): Promise<any> {
    let licensePlate = null
    try {
      for (let i = 0; i < 5; i++) {
        licensePlate = await this.detectLocalLicensePlate(imagePath)
        if (licensePlate !== null) {
          break
        }
      }
      if (!licensePlate) {
        // const data2 = await this.detectWithPlateRecognizer(imagePath)
        const data2 = await this.runDetectCurlScript(imagePath)
        console.log({ data2 })
        licensePlate = data2 ? data2 : null
      }
      return { license_plate: licensePlate ? licensePlate.toUpperCase() : null }
    } catch (err) {
      console.log(err)
      const data2 = await this.detectWithPlateRecognizer(imagePath)
      licensePlate = data2 ? data2 : null
      return { license_plate: licensePlate ? licensePlate.toUpperCase() : null }
    }
  }

  async detectLocalLicensePlate(imagePath: string): Promise<any> {
    try {
      const headers = {
        'Content-Type': 'application/json',
      }
      const body = {
        image_path: imagePath.trim(),
      }
      const url = `${this.configService.get<string>(
        'global.http.detect_api_url_endpoint',
      )}/detect`
      const { data } = await firstValueFrom(
        this.httpService.post(url, body, { headers }).pipe(
          catchError((error: AxiosError) => {
            console.log(error)
            throw 'An error happened!'
          }),
        ),
      )
      let licensePlate = String(data['license_plate']).replace('-', '')
      this.logger.debug(`License plate: ${JSON.stringify(licensePlate)}`)
      return regexLicensePlate(licensePlate) ? licensePlate : null
    } catch (err) {
      console.log(err)
      return null
    }
  }

  async detectWithPlateRecognizer(imagePath: string): Promise<any> {
    try {
      const API_TOKEN = `${this.configService.get<string>(
        'global.plate_recognizer.api_token',
      )}`
      const url = `${this.configService.get<string>(
        'global.plate_recognizer.api_url',
      )}`

      let body = new FormData()
      body.append('upload', fs.createReadStream(imagePath))
      body.append(
        'config',
        '{"mode":"fast", "threshold_d":0.2, "threshold_o":0.6}',
      )
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url,
        headers: {
          Authorization: `Token ${API_TOKEN}`,
          ...body.getHeaders(),
        },
        data: body,
      }
      const { data } = await firstValueFrom(
        this.httpService.request(config).pipe(
          catchError((error: AxiosError) => {
            console.log(error)
            throw 'An error happened!'
          }),
        ),
      )
      console.log(data)
      return data?.results[0]?.plate
        ? String(data?.results[0]?.plate).toLocaleUpperCase()
        : null
    } catch (err) {
      console.log(err)
      return null
    }
  }

  async runDetectCurlScript(imagePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const pythonProcess = spawn('bash', [
        `${this.configService.get('global.script_path')}/scripts/detect.sh`,
        imagePath,
      ])

      let output = ''
      pythonProcess.stdout.on('data', (data: any) => {
        output += data.toString()
      })

      pythonProcess.stderr.on('data', (data: any) => {
        console.error(`stderr: ${data}`)
      })

      pythonProcess.on('close', (code: any) => {
        if (code === 0) {
          resolve(output.trim())
        } else {
          reject(`Python script exited with code ${code}`)
        }
      })
    })
  }
}
