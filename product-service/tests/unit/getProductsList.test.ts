import { getProductList } from "../../getProductList";
import { jest, describe, expect, test} from '@jest/globals';

jest.mock("dotenv", () => ({
    config: jest.fn()
}))

describe("getProductsList tests", () => {

    test("Should return all products", async () => {
        const event = {
            httpMethod: 'GET'
        }
        const response = await getProductList(event);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe("[{\"id\":\"7567ec4b-b10c-48c5-9345-fc73c48a80aa\",\"title\":\"ProductOne\",\"description\":\"Short Product Description1\",\"price\":\"24\",\"count\":0},{\"id\":\"7567ec4b-b10c-48c5-9445-fc73c48a80a2\",\"title\":\"Product2\",\"description\":\"Short Product Descriptio1\",\"price\":\"23\",\"count\":0},{\"id\":\"7567ec4b-b10c-45c5-9345-fc73c48a80a1\",\"title\":\"ProductName\",\"description\":\"Short Product Description7\",\"price\":\"15\",\"count\":0},{\"id\":\"7567ec4b-b10c-48c5-9345-fc73c48a80a1\",\"title\":\"ProductTitle\",\"description\":\"Short Product Description7\",\"price\":\"15\",\"count\":0},{\"id\":\"7567ec4b-b10c-48c5-9345-fc73c48a80a3\",\"title\":\"Product\",\"description\":\"Short Product Description2\",\"price\":\"23\",\"count\":0},{\"id\":\"123124sdfg\",\"title\":\"Good book 2\",\"description\":\"Some description 2\",\"price\":\"120\",\"count\":0},{\"id\":\"1234235\",\"title\":\"Good book\",\"description\":\"Some description\",\"price\":\"100\",\"count\":0},{\"id\":\"1255235\",\"title\":\"Product 234\",\"description\":\"Some product\",\"price\":\"12\",\"count\":0},{\"id\":\"7567ec4b-b10c-48c5-9345-fc73348a80a1\",\"title\":\"ProductTest\",\"description\":\"Short Product Description4\",\"price\":\"15\",\"count\":0}]");
    });

});