import { S3 } from '@aws-sdk/client-s3'
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

export const s3Client = new S3({
  forcePathStyle: false, // Configures to use subdomain/virtual calling format.
  endpoint: process.env.DO_SPACES_ENDPOINT,
  region: 'ap-southeast-1',
  credentials: {
    accessKeyId: process.env.DO_SPACES_KEY,
    secretAccessKey: process.env.DO_SPACES_SECRET,
  },
})

export const getImageDOLink = (bucket: string, fileName: string) => {
  return `https://${bucket}.sgp1.digitaloceanspaces.com/${fileName}`
}
