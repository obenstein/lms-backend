import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

console.log("S3Client init with:", {
  access: process.env.R2_ACCESS_KEY_ID,
  secret: process.env.R2_SECRET_ACCESS_KEY ? "EXISTS" : "MISSING",
  endpoint: process.env.R2_ENDPOINT,
});

let s3ClientInstance = null;

export const getS3Client = () => {
  if (!s3ClientInstance) {
    console.log("Initializing S3 Client with endpoint:", process.env.R2_ENDPOINT);
    s3ClientInstance = new S3Client({
      region: "auto",
      endpoint: process.env.R2_ENDPOINT,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID?.trim() || "",
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY?.trim() || "",
      },
    });
  }
  return s3ClientInstance;
};
