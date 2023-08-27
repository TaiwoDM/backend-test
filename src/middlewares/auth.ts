import { Request, Response, NextFunction } from "express";
import jwt, { decode, JwtPayload } from "jsonwebtoken";
import * as dotenv from "dotenv";
import { User } from "src/models";
import { generateErrorObj } from "src/utils/errorHandler";
dotenv.config();

const protect = async (req: Request, res: Response, next: NextFunction) => {
    try {

        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return next(generateErrorObj("You are not logged in, please login to get access", 401, "failed"))
        }

        const { email } = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload


        const currentUser: any = await User.findOne({
            where: {
                email
            }
        });


        if (!currentUser) {
            return next(generateErrorObj('The user belonging to this token does no longer exist.', 401, "failed"))
        }

        req.user = currentUser.email;

        console.log(req.user + " in protect middleware")
        next();
    } catch (error) {
        return next(error)
    }
}

export { protect }