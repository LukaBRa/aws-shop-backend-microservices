import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { response } from "../utils/response";
import dotenv from "dotenv";
import { ProductClient } from "../database/product.client";

dotenv.config();

export async function getProductsById(event) { 
    
    console.log(event);

    try {
        const { productId } = event.pathParameters;

        const product = await ProductClient.getItemCommand(productId);

        if(product){
            const responseProduct = {
                id: product.Item?.id.S,
                title: product.Item?.title.S,
                description: product.Item?.description.N,
                price: product.Item?.price.N
            }
            return response(200, JSON.stringify(responseProduct));
        } else{
            return response(404, JSON.stringify({ message: "Product not found." }));
        }

    } catch (err) {
        console.error("Failed to get product.", err);
        return response(500, JSON.stringify({ message: "Internal Server Error." }));
    }

}
