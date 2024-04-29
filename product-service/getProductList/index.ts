import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { response } from "../utils/response";
import { ProductClient } from "../database/product.client";

export async function getProductList(event) {

  try {

    const products = await ProductClient.scanCommand();
    
    return response(200, JSON.stringify(products));
  } catch (err) {
    console.error("Failed to get all products.", err);
    return response(500, JSON.stringify({ message: "Internal Server Error" }));
  } 
  
}
  