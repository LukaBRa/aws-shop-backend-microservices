import dotenv from "dotenv";
import { response } from "../utils/response";
import { S3Client, GetObjectCommand, CopyObjectCommand } from "@aws-sdk/client-s3";
import { GetQueueUrlCommand, SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { Readable } from "stream";
import csvParser from "csv-parser";

dotenv.config();

export async function importFileParser(event) {

    try {

        const s3Client = new S3Client({ region: process.env.BUCKET_NAME });
        const record = event.Records[0];
        const bucketName = record.s3.bucket.name;
        const key = record.s3.object.key;
        const sqsClient = new SQSClient({});
        const getQueueUrlCommand = new GetQueueUrlCommand({ QueueName: process.env.SQS_QUEUE_NAME });
        const queueUrl = await sqsClient.send(getQueueUrlCommand);

        const params = {
            Bucket: bucketName,
            Key: key
        };

        const command = new GetObjectCommand(params);
        const s3Object = await s3Client.send(command);
        const s3ReadStream = s3Object.Body as Readable;

        s3ReadStream.pipe(csvParser())
            .on("data", async (data) => {
                const sendMessageCommand = new SendMessageCommand({
                    QueueUrl: queueUrl.QueueUrl,
                    DelaySeconds: 10,
                    MessageAttributes: {},
                    MessageBody: data
                });
                const response = await sqsClient.send(sendMessageCommand);
                console.log(response);
            })
            .on("end", async () => {
                const copyObjectParams = {
                    Bucket: process.env.BUCKET_NAME,
                    CopySource: process.env.BUCKET_NAME + "/" + record.s3.object.key,
                    Key: record.s4.object.key.replace("uploaded", "parsed")
                }
                const copyCommand = new CopyObjectCommand(copyObjectParams);
                await s3Client.send(copyCommand);
            })
            .on("error", (error) => {
                console.error("Failed to parse file.", error);
            })

        return response(200, "File is parsed.");
    } catch (err) {
        console.error("Failed to parse products.", err);
        return response(500, "Internal server error.");
    }

}