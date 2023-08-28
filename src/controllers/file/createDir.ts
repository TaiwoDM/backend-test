import { Request, Response, NextFunction } from "express"
import { awsS3ClientV2 } from "src/config/awsConfig";
import { Folder } from "src/models";
import { generateErrorObj } from "src/utils/errorHandler";

const createDir = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { dirName } = req.body

        if (!dirName) {
            return next(generateErrorObj("Provide directory name", 400, "failed"));
        }

        const id = `${dirName}-${req.user?.email}/`

        const dirExist = await Folder.findOne({
            where: {
                folderId: id
            }
        })

        if (dirExist) {
            return next(generateErrorObj("You already have a folder with that name. Use another name", 400, "failed"));
        }

        await awsS3ClientV2.putObject({
            Key: id,
            Bucket: `rise-test-cloudapp-bucket`,
        }).promise();

        await Folder.create({
            folderId: id,
            dirName,
            UserEmail: req.user?.email
        })


        return res.status(201).json({ status: "success", message: `Directory ${dirName}-${req.user?.email} has been created successfully.` })

    } catch (error) {
        next(generateErrorObj("An error occured when trying to create new directory.", 500, "error"));
    }
}


export default createDir