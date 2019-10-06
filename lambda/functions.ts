import { Handler, Context, Callback } from 'aws-lambda';
import data from './data.json';

interface LambdaResponse {
    statusCode: number;
    body: string;
}

const getJobs: Handler = (event: any, context: Context, callback: Callback) => {
    const response: LambdaResponse = {
        statusCode: 200,
        body: JSON.stringify(data)
    };

    callback(null, response);
};

export {
    getJobs
};
