import aws from "aws-sdk";
import * as dotenv from "dotenv";
dotenv.config();

const awsS3ClientV2 = new aws.S3({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
    region: process.env.AWS_REGION,
    apiVersion: process.env.AWS_API_VERSION,
});


export { awsS3ClientV2 };