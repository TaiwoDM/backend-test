import express, { Request, Response, NextFunction } from "express";

import { User } from "src/models/index";
import { generateAndSendToken, hashPassword } from "src/utils/auth";
import { generateErrorObj } from "src/utils/errorHandler";


const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { fullName, email, password, admin } = req.body;

        if (!fullName || !email || !password)
            return next(generateErrorObj("Provide all required details.", 400, "failed"));

        if (admin && (admin !== false && admin !== true))
            return next(generateErrorObj("Incorrect value for admin field. Can only be true or false", 400, "failed"));

        if (admin !== false && !admin) {
            admin = false
        }


        const encryptedPassword = await hashPassword(password);

        const userExists = await User.findOne({
            where: {
                email
            }
        })

        if (userExists)
            return next(generateErrorObj("Provided email is already taken. Use another.", 400, "failed"));


        const newUser = await User.create({
            fullName,
            email,
            password: encryptedPassword,
            admin
        });

        return generateAndSendToken(newUser.dataValues, res, 201)

    } catch (error) {
        return next(generateErrorObj("An error occured when trying to register new user", 500, "error"));
    }
};

export { signup };
