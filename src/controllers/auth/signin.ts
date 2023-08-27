import { Request, Response, NextFunction } from "express";

import { User } from "src/models/index";
import { comparePassword, generateAndSendToken } from "src/utils/auth";
import { generateErrorObj } from "src/utils/errorHandler";

const signin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(generateErrorObj("Provide all required details", 400, "failed"));
        }

        const user: any = await User.findOne({
            where: {
                email
            }
        });

        if (!user) {
            return next(generateErrorObj("email or password incorrect", 400, "failed"));
        }

        const passwordCorrect = await comparePassword(password, user.password);

        if (!passwordCorrect) {
            return next(generateErrorObj("email or password incorrect", 400, "failed"));
        }

        generateAndSendToken(user.dataValues, res, 201)
    } catch (error) {
        next(generateErrorObj("An error occured while trying to sign user in.", 500, "failed"));
    }
};

export default signin;