import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { response } from "../utils/response";
import dotenv from "dotenv";

dotenv.config();

export async function getProductsById(event) { 
    
    try {
        const { productId } = event.pathParameters;
        const client = new DynamoDBClient({ region: process.env.AWS_ACCOUNT_REGION });
        const command = new GetItemCommand({
            TableName: process.env.PRODUCT_TABLE_NAME,
            Key: {
                id: {
                    "S": productId
                }
            }
        })

        const product = await client.send(command);

        if(product){
            return response(200, JSON.stringify(product.Item));
        } else{
            return response(404, JSON.stringify({ message: "Product not found." }));
        }

    } catch (err) {
        console.error("Failed to get product.", err);
        return response(500, JSON.stringify({ message: "Internal Server Error." }));
    }

}
