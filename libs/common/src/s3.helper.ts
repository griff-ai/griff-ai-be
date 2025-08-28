import * as AWS from 'aws-sdk';
require('dotenv').config();

export const getPresignedUrl = async (pathFile: string) => {
  AWS.config.update({
    signatureVersion: 'v4',
    region: process.env.AWS_S3_REGION,
  });
  const s3Sdk = new AWS.S3(); // without secretAccessKey
  // const s3Sdk = new AWS.S3({
  //   accessKeyId: process.env.AWS_S3_ID,
  //   secretAccessKey: process.env.AWS_S3_KEY,
  // })
  const presignedGETURL = await s3Sdk.getSignedUrlPromise('getObject', {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: pathFile, //filename
    Expires: Number(process.env.AWS_S3_EXPIRE) || 5 * 60, //time to expire in seconds
  });
  return presignedGETURL;
};
