import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { response } from "../utils/response";
import dotenv from "dotenv";
import { validateProductBody } from "../utils/validateProductBody";
import type { IProduct } from "../types/product.type"; 

dotenv.config();

export async function createProduct(event) { 
    
    try {
    
        const { id, title, description, price }: IProduct = event.body;

        if(!validateProductBody({ id, title, description, price })){
            return response(400, JSON.stringify({ message: "Invalid product." }));
        }

        const client = new DynamoDBClient({ region: process.env.AWS_ACCOUNT_REGION });
        const command = new PutItemCommand({
            TableName: process.env.PRODUCT_TABLE_NAME,
            Item: {
                id: { S: id },
                title: { S: title },
                description: { S: description },
                price: { N: price.toString() }
            }
        });

        const newProductResponse = await client.send(command);

        return response(200, JSON.stringify(newProductResponse));

    } catch (err) {
        console.error("Failed to create product.", err);
        return response(500, JSON.stringify({ message: "Internal Server Error." }));
    }

}
