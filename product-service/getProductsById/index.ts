import { mockProducts } from "../shared/mock-data";

export async function getProductsById(event) {
    const { productId } = event.pathParameters; 
    const product = mockProducts.find(product => product.id === productId);

    if (product) {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': 'https://shop-react-redux-cloudfront-luka.s3.eu-north-1.amazonaws.com',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({
                product: product
            })
        };
    } else {
        return {
            statusCode: 404,
            headers: {
                'Access-Control-Allow-Origin': 'https://shop-react-redux-cloudfront-luka.s3.eu-north-1.amazonaws.com',
                'Access-Control-Allow-Credentials': true,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: "Product not found."
            })
        };
    }
}
