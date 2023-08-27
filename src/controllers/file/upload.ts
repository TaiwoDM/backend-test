import { Request, Response, NextFunction } from "express";
import { uploadFile } from "src/middlewares/file";
import fs from "fs"
import util from "util"
const unlinkFile = util.promisify(fs.unlink)

import { File, Folder } from "src/models/index";
import { MulterRequest } from "src/interfaces/interfaces";
import { generateErrorObj } from "src/utils/errorHandler";

const uploadFileController = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const ownerEmail = req.user
        const { dirName } = req.body
        const FolderId = `${dirName}-${ownerEmail}/`
        const file = req.file;

        if (!dirName) {
            return next(generateErrorObj("Please specify the target folder name", 400, "failed"))
        }

        if (file?.originalname.includes("/")) {
            return next(generateErrorObj("Character / not allowed in file name. Adjust and retry", 400, "failed"))
        }

        if (!file) {
            return next(generateErrorObj("Insert file to upload", 400, "failed"))
        }

        const folder = await Folder.findOne({
            where: {
                folderId: FolderId
            }
        })

        if (!folder) {
            return next(generateErrorObj(`You do not own folder ${dirName}. Create a directory that match the name and retry`, 400, "failed"))
        }

        const result = await uploadFile(file, FolderId)
        await unlinkFile(file.path)


        const key = `${Date.now()}-${file.originalname}`
        const size = file.size
        const mimetype = file.mimetype
        const location = result.Key

        const newFile = await File.create({

            id: key,
            size: size,
            file: location,
            type: mimetype,
            UserEmail: ownerEmail,
            FolderFolderId: FolderId

        })

        return res.status(201).json({ status: "success", message: "File successfully updated", data: newFile })
    } catch (error) {
        return next(generateErrorObj("Something occured while program was trying to add create a file", 500, "error"));
    }

}



export default uploadFileController