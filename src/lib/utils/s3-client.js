import fs from "fs";

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

  if (!process.env.S3_UPLOAD_ENDPOINT) {
    fs.mkdir(process.cwd() + "/upload/", { recursive: true }, (err) => {
      if (err) throw err;
    });
    fs.writeFileSync(
      process.cwd() + "/upload/" + file.name,
      Buffer.from(await new Blob([file]).arrayBuffer())
    );
  } else {

    const params = {
      Bucket: process.env.S3_UPLOAD_BUCKET,
      Key: `${process.env.S3_UPLOAD_LOCATION}/${file.name}`,
      Body,
      ContentType: file.type
    }

    const command = new PutObjectCommand(params)
    await s3Client.send(command)
  }


}

export const getFileS3 = async (fileName) => {
  if (!process.env.S3_UPLOAD_ENDPOINT) {
    return `/api/file/${fileName}`
  } else {
  const params = {
    Bucket: process.env.S3_UPLOAD_BUCKET,
    Key: `${process.env.S3_UPLOAD_LOCATION}/${fileName}`,
  }

  const file = new GetObjectCommand(params)
  return await getSignedUrl(s3Client, file)
  }
}