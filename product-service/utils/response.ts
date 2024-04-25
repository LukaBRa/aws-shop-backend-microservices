import dotenv from 'dotenv';
dotenv.config();
export const response = (statusCode: number, body: string) => {
    return {
        statusCode,
        headers: {
            'Access-Control-Allow-Origin': process.env.FRONT_END_APP,
            'Access-Control-Allow-Credentials': true,
            'Content-Type': 'application/json'
        },
        body 
    }
}