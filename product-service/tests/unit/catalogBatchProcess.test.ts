import { jest, describe, test, expect, beforeEach } from "@jest/globals";

jest.mock("dotenv", () => ({
    config: jest.fn()
}))


import { ProductClient } from "../../database/product.client";
import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";

jest.mock("../../database/product.client.ts", () => ({
    ProductClient: {
        putItemCommand: jest.fn()
    }
}))

jest.mock("@aws-sdk/client-sns", () => {
    const SNSClient = jest.fn();
    SNSClient.prototype.send = jest.fn();
    return {
        SNSClient,
        PublishCommand: jest.fn()
    };
});

import { handler } from "../../catalogBatchProcess/index"

describe("catalogBatchProcess", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test("should process products and publish success message", async () => {
        const event = {
            Records: [
                {
                    messageId: '1',
                    body: {
                        id: '1',
                        title: "Pen",
                        description: "Good pen",
                        price: 10
                    }
                }
            ]
        };

        await handler(event);

        expect(ProductClient.putItemCommand).toHaveBeenCalledWith({
            id: '1',
            title: "Pen",
            description: "Good pen",
            price: 10
        });
        expect(SNSClient).toHaveBeenCalledWith({});
        expect(PublishCommand).toHaveBeenCalledWith({
            Message: 'Products are successfully saved',
            TopicArn: 'arn:aws:sns:eu-north-1:533267095900:createProductTopic'
        })
        expect(SNSClient.prototype.send).toHaveBeenCalled();        

    })

})