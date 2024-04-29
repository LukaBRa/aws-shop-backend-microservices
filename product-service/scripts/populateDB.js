import { DynamoDBClient, BatchWriteItemCommand } from "@aws-sdk/client-dynamodb";
import { mockProducts } from '../mock-data.js';
import dotenv from "dotenv";

dotenv.config();

const client = new DynamoDBClient({ region: process.env.AWS_ACCOUNT_REGION });

const putRequests = mockProducts.map((product) => ({
    PutRequest: {
        Item: product
    }
}));

const command = new BatchWriteItemCommand({
    RequestItems: {
        [process.env.PRODUCT_TABLE_NAME]: putRequests
    }
})

try{
    await client.send(BatchWriteItemCommand);
} catch (err) {
    console.error("Failed to populate DB", err);
}