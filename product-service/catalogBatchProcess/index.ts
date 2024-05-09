import { ProductClient } from "../database/product.client";
import type { IProduct } from "../types/product.type";
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import dotenv from "dotenv";
dotenv.config();

export async function handler (event) {
    try {

        for (const { body } of event.Records) {
            const { id, title, description, price }: IProduct = body;
            await ProductClient.putItemCommand({ id, title, description, price });
        }
        const snsClient = new SNSClient({});
        const publishCommand = new PublishCommand({
            Message: "Products are successfully saved",
            TopicArn: `arn:aws:sns:eu-north-1:533267095900:${process.env.SNS_TOPIC_NAME}`
        })
        await snsClient.send(publishCommand);
        return `Successfully processed ${event.Records.length} products.`;

    } catch (err) {
        console.error("Failed to procces product.", err);
    }
};
