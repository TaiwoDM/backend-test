import multer from "multer"
import fs from "fs"
import { awsS3ClientV2 } from "src/config/awsConfig";

const upload = multer({ dest: 'uploads/', limits: { fileSize: 200 * 1024 * 1024 } },)

const uploadFile = (file: any, dirName: string) => {
    const fileStream = fs.createReadStream(file.path)

    return awsS3ClientV2.upload({
        Bucket: "rise-test-cloudapp-bucket",
        Body: fileStream,
        Key: `${dirName}${Date.now()}-${file.originalname}`
    }).promise()
}

export { upload, uploadFile }