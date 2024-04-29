import { DynamoDBClient, GetItemCommand, ScanCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import dotenv from "dotenv";
import type { IProduct } from "../types/product.type";

dotenv.config();

export class ProductClient {

    static #client = new DynamoDBClient({ region: process.env.AWS_ACCOUNT_REGION });

    static async getItemCommand(productId: string) {
        const command = new GetItemCommand({
            TableName: process.env.PRODUCT_TABLE_NAME,
            Key: {
                id: {
                    "S": productId
                }
            }
        })
        const product = await this.#client.send(command);
        return product;
    }

    static async scanCommand() {
        const productsCommand = new ScanCommand({
            TableName: process.env.PRODUCT_TABLE_NAME
          })
          const stockCommand = new ScanCommand({
            TableName: process.env.STOCK_TABLE_NAME
          })
      
          const productsResponse = await this.#client.send(productsCommand);
          const stockResponse = await this.#client.send(stockCommand);

          const products = productsResponse.Items?.map((product) => {
            const productStock = stockResponse.Items?.find((stock) => stock.productId == product.id);
            return {
              id: product.id.S,
              title: product.title.S,
              description: product.description.S,
              price: product.price.N,
              count: productStock ? productStock.count : 0
            }
          });

          return products;
    }

    static async putItemCommand({ id, title, description, price }: IProduct) {
        const command = new PutItemCommand({
            TableName: process.env.PRODUCT_TABLE_NAME,
            Item: {
                id: { S: id },
                title: { S: title },
                description: { S: description },
                price: { N: price.toString() }
            }
        });

        const newProductResponse = await this.#client.send(command);
        return newProductResponse;
    }

}