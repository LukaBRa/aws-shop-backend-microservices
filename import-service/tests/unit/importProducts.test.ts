import { importProductsFile } from "../../importProducts";
import { describe, test, expect, jest } from "@jest/globals";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { mockClient } from "aws-sdk-client-mock";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

describe("importProsuctsFile tests", () => {

    test("should return signed url", async () => {

        const mockEvent = {
            queryStringParameters: {
                name: 'example.csv'
            }
        }
        
        const s3Mock = mockClient(S3Client);
        s3Mock.on(PutObjectCommand).resolves({})

        const result = await importProductsFile(mockEvent);

        expect(result.statusCode).toBe(200);
        expect(JSON.parse(result.body)).toBeTruthy();
    });

    test("should return status code 400 and message Invalid file name.", async () => {

        const mockEvent = {
            queryStringParameters: {
                name: ''
            }
        }

        const result = await importProductsFile(mockEvent);

        expect(result.statusCode).toBe(400);
        expect(result.body).toEqual("Invalid file name.");
    })

})