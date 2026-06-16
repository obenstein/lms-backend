import Express from "express";
import multer from "multer";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getS3Client } from "../utils/s3-client.js";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const router = Express.Router();

// Configure multer to use memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Generate a unique filename
    const uniqueSuffix = Date.now() + "-" + crypto.randomBytes(6).toString("hex");
    const originalName = req.file.originalname;
    const extension = originalName.substring(originalName.lastIndexOf("."));
    const fileName = `${uniqueSuffix}${extension}`;

    const params = {
      Bucket: process.env.R2_BUCKET_NAME,
      Key: fileName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    const command = new PutObjectCommand(params);
    await getS3Client().send(command);

    // Return the CDN URL
    // Ensure the domain is properly formatted (e.g. cdn.roboautomators.com)
    // If the .env only has cdn.roboautomators, this will use it directly.
    const fileUrl = `https://${process.env.CDN_PUBLIC_DOMAIN}/${fileName}`;

    return res.status(200).json({
      message: "File uploaded successfully",
      fileUrl: fileUrl,
    });
  } catch (error) {
    console.error("Error uploading to R2:", error);
    return res.status(500).json({ error: "Failed to upload file to R2" });
  }
});

export default router;
