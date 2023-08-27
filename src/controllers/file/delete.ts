import { Request, Response, NextFunction } from "express"
import { awsS3ClientV2 } from "src/config/awsConfig";

import { File } from "src/models";
import { generateErrorObj } from "src/utils/errorHandler";

const deleteFile = async (req: Request, res: Response, next: NextFunction) => {
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
        Key: file.dataValues.id,
        Bucket: "rise-test-cloudapp-bucket"
    }

    await awsS3ClientV2.deleteObject(getObjParams).promise()

    await File.destroy({
        where: {
            id: file.dataValues.id
        }
    })

    res.status(200).json({
        status: "success",
        message: "File deleted sucessfully"
    })
}

export default deleteFile