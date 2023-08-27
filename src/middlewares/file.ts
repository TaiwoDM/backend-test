import multer from "multer"
import fs from "fs"
import multerS3 from "multer-s3"
import { nanoid } from "nanoid";
import { awsS3ClientV2 } from "src/config/awsConfig";

const upload = multer({ dest: 'uploads/' })

const uploadFile = (file: any, dirName: string) => {
    const fileStream = fs.createReadStream(file.path)


    return awsS3ClientV2.upload({
        Bucket: "rise-test-cloudapp-bucket",
        Body: fileStream,
        Key: `${dirName}${Date.now()}-${file.originalname}`
    }).promise()
}



export { upload, uploadFile }