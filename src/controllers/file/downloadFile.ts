import { Request, Response, NextFunction } from "express";

import { awsS3ClientV2 } from "src/config/awsConfig";
import { generateErrorObj } from "src/utils/errorHandler";
import { File } from "src/models/index";

const downloadFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

        console.log(id + "!!!!!!!!!!!!!!!!!!!!!!!!!!!!")

        const file: any = await File.findOne({
            where: {
                id
            }
        });

        console.log(file)


        if (!file) {
            return next(generateErrorObj("The file being requested doesn't exist anymore or never existed.", 400, "failed"))
        }

        if (file.dataValues.UserEmail != req.user?.email) {
            return next(generateErrorObj("You do not have access to this file.", 401, "failed"))
        }

        const getObjParams = {
            Key: file.dataValues.file,
            Bucket: "rise-test-cloudapp-bucket"
        }

        const fileRes = await awsS3ClientV2.getObject(getObjParams).promise()

        console.log(file)

        return res.send(fileRes.Body)

    } catch (error) {
        next(generateErrorObj("An error occured when trying to download file.", 500, "error"));
    }
}

export default downloadFile