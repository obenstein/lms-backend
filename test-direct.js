import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

const testDirectUpload = async () => {
  const s3Client = new S3Client({
    region: "auto",
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  });

  try {
    const params = {
      Bucket: process.env.R2_BUCKET_NAME,
      Key: "direct-test.txt",
      Body: "Hello, this is a test.",
      ContentType: "text/plain",
    };

    console.log("Using endpoint:", process.env.R2_ENDPOINT);
    console.log("Using bucket:", process.env.R2_BUCKET_NAME);

    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    console.log("Direct upload succeeded!");
  } catch (err) {
    console.error("Direct upload failed:");
    console.error(err);
  }
};

testDirectUpload();
