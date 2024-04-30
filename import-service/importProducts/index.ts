import dotenv from "dotenv";
import { response } from "../utils/response";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

dotenv.config();

export async function importProductsFile(event) {

    const { name } = event.queryStringParameters;

    if(!name){
        return response(400, "Invalid file name.");
    }

    try {

        const s3client = new S3Client({region: process.env.AWS_REGION_PARAM});
        const command = new PutObjectCommand({ Bucket: process.env.BUCKET_NAME, Key: name});
        const signedUrl = await getSignedUrl(s3client, command, { expiresIn: 3600 });

        return response(200, JSON.stringify(signedUrl));

    } catch (err) {
        console.error("Failed to import products file.", err);
        return response(500, "Internal server error.");
    }


}