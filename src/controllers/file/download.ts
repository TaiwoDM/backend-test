import { Request, Response, NextFunction } from "express";

import { awsS3ClientV2 } from "src/config/awsConfig";
import { generateErrorObj } from "src/utils/errorHandler";
import { File } from "src/models/index";

const downloadFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

        const file: any = await File.findOne({
            where: {
                id
            }
        });

        if (!file) {
            return next(generateErrorObj("The file being requested doesn't exist anymore or never existed.", 401, "failed"))
        }

        if (file.dataValues.UserEmail != req.user) {
            return next(generateErrorObj("You do not have access to this file.", 401, "failed"))
        }

        const getObjParams = {
            Key: id,
            Bucket: "rise-test-cloudapp-bucket"
        }

        const fileRes = await awsS3ClientV2.getObject(getObjParams).promise()


        return res.send(fileRes.Body)

    } catch (error) {
        return next(error)
    }
}

export default downloadFile