import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { response } from "../utils/response";

export async function getProductList(event) {

  try {

    const client = new DynamoDBClient({ region: process.env.AWS_ACCOUNT_REGION });
    const productsCommand = new ScanCommand({
      TableName: process.env.PRODUCT_TABLE_NAME
    })
    const stockCommand = new ScanCommand({
      TableName: process.env.STOCK_TABLE_NAME
    })

    const productsResponse = await client.send(productsCommand);
    const stockResponse = await client.send(stockCommand);

    const products = productsResponse.Items?.map((product) => {
      const productStock = stockResponse.Items?.find((stock) => stock.productId == product.id);
      return {
        ...product,
        count: productStock ? productStock.count : 0
      }
    });
    
    return response(200, JSON.stringify(products));
  } catch (err) {
    console.error("Failed to get all products.", err);
    return response(500, JSON.stringify({ message: "Internal Server Error" }));
  } 
  
}
  