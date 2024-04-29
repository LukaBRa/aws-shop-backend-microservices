import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { response } from "../utils/response";
import dotenv from "dotenv";
import { validateProductBody } from "../utils/validateProductBody";
import type { IProduct } from "../types/product.type"; 
import { ProductClient } from "../database/product.client";

dotenv.config();

export async function createProduct(event) { 

    console.log(event);
    
    try {
    
        const { id, title, description, price }: IProduct = event.body;

        if(!validateProductBody({ id, title, description, price })){
            return response(400, JSON.stringify({ message: "Invalid product." }));
        }

        const newProductResponse = await ProductClient.putItemCommand({ id, title, description, price });

        return response(200, JSON.stringify(newProductResponse));

    } catch (err) {
        console.error("Failed to create product.", err);
        return response(500, JSON.stringify({ message: "Internal Server Error." }));
    }

}
