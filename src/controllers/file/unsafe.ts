import { Request, Response, NextFunction } from "express";

import { generateErrorObj } from "src/utils/errorHandler";
import { File } from "src/models/index";
import restrictTo from "src/utils/files";
import { awsS3ClientV2 } from "@App/config/awsConfig";

const tagUnsafe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    restrictTo(req.user?.admin!, next);

    const { id } = req.params;

    const fileToDelete = await File.findOne({
      where: {
        id,
      },
    });

    if (!fileToDelete) {
      return next(
        generateErrorObj("Specified file does not exist", 400, "failed")
      );
    }

    await File.update(
      { unsafe: true },
      {
        where: {
          id,
        },
      }
    );

    const file: any = await File.findOne({
      where: {
        id,
      },
    });

    const getObjParams = {
      Key: file.dataValues.file,
      Bucket: "rise-test-cloudapp-bucket",
    };

    await awsS3ClientV2.deleteObject(getObjParams).promise();

    await File.destroy({
      where: {
        id: file.dataValues.id,
      },
    });

    return res.status(202).json({ message: "File successfully deleted" });
  } catch (error) {
    next(generateErrorObj("An error occured when list files", 500, "error"));
  }
};

export default tagUnsafe;
