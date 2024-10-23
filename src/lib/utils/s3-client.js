
import { GetObjectCommand, PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3({
  forcePathStyle: false, // Configures to use subdomain/virtual calling format.
  endpoint: process.env.S3_UPLOAD_ENDPOINT,
  // sslEnabled: false,
  region: process.env.S3_UPLOAD_REGION,
  credentials: {
    accessKeyId: process.env.S3_UPLOAD_KEY,
    secretAccessKey: process.env.S3_UPLOAD_SECRET
  }
});

export { s3Client };

export const uploadFileS3 = async (file) => {
  const Body = Buffer.from(await new Blob([file]).arrayBuffer())

  const params = {
    Bucket: process.env.S3_UPLOAD_BUCKET,
    Key: `${process.env.S3_UPLOAD_LOCATION}/${file.name}`,
    Body,
    ContentType: file.type
  }

  const command = new PutObjectCommand(params)
  return await s3Client.send(command)

}

export const getFileS3 = async (fileName) => {
  const params = {
    Bucket: process.env.S3_UPLOAD_BUCKET,
    Key: `${process.env.S3_UPLOAD_LOCATION}/${fileName}`,
  }

  const file = new GetObjectCommand(params)
  return await getSignedUrl(s3Client, file)

}