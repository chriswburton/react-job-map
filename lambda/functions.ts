import { Handler, Context, Callback } from 'aws-lambda';
import data from './data.json';

interface LambdaResponse {
    statusCode: number;
    headers: { [x: string]: string }
    body: string;
}

export const getJobs: Handler = (event: any, context: Context, callback: Callback) => {
    const response: LambdaResponse = {
        statusCode: 200,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data.jobs)
    };

    callback(null, response);
};
