import { getProductsById } from "../../getProductsById";
import { jest, describe, expect, test} from '@jest/globals';

jest.mock("dotenv", () => ({
    config: jest.fn()
}))

describe("getProductsById tests", () => {

    test("Should not return a product", async () => {
        const event = {
            pathParameters: {
                producId: "123"
            }
        }
        const response = await getProductsById(event);
        expect(response.statusCode).toBe(404);
        expect(response.body).toBe("{\"message\":\"Product not found.\"}");
    });

    test("Should return a product", async () => {
        const event = {
            httpMethod: 'GET',
            pathParameters: {
                productId: '7567ec4b-b10c-48c5-9345-fc73348a80a1',
            },
        }
        const response = await getProductsById(event);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe("{\"id\":\"7567ec4b-b10c-48c5-9345-fc73348a80a1\",\"title\":\"ProductTest\",\"price\":\"15\"}");
    });

});