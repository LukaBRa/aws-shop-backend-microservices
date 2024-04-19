import { mockProducts } from "../shared/mock-data";

export async function getProductList(event) {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://shop-react-redux-cloudfront-luka.s3.eu-north-1.amazonaws.com',
      'Access-Control-Allow-Credentials': true,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      products: mockProducts,
    }),
  }
  }
  