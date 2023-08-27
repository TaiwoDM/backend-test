import express, { Request, Response, NextFunction } from "express";

import { User } from "src/models/index";
import { generateAndSendToken, hashPassword } from "src/utils/auth";
import { generateErrorObj } from "src/utils/errorHandler";


const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password)
            next(generateErrorObj("Provide all required details.", 400, "failed"));


        const encryptedPassword = await hashPassword(password);

        const userExists = await User.findOne({
            where: {
                email
            }
        })

        if (userExists)
            next(generateErrorObj("Provided email is already taken. Use another.", 400, "failed"));



        const newUser = await User.create({
            fullName,
            email,
            password: encryptedPassword,
        });

        generateAndSendToken(newUser, res, 201)
    } catch (error) {
        return next(error);
    }
};

export { signup };
