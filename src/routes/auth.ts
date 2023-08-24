import express, { Request, Response, NextFunction } from "express";

import { ErrorResponse } from "src/utils/errorHandler";
import { hashPassword, comparePassword } from "src/utils/auth";
import User, { IUser } from "src/models/User";

const router = express.Router();

router.post(
  "/signup",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { fullName, email, password } = req.body;

      if (!fullName || !email || !password) {
        const err: ErrorResponse = new Error("Provide all required details");
        err.statusCode = 400;
        err.status = "failed";
        return next(err);
      }

      const encryptedPassword = await hashPassword(password);

      console.log(encryptedPassword)

      const newUser = await User.create({
        fullName,
        email,
        password: encryptedPassword,
      });

      console.log(newUser)

      return res.status(201).json({
        status: "success",
        message: "User sucessfully created",
        data: newUser,
      });
    } catch (error) {
      return next(error);
    }
  }
);

router.post(
  "/signin",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        const err: ErrorResponse = new Error("Provide all required details");
        err.statusCode = 400;
        err.status = "failed";
        return next(err);
      }

      const user: any = await User.findOne({
        where: {
          email
        }
      });

      if (!user) {
        return res.status(400).json({
          status: "failed",
          message: "email or password incorrect"
        })
      }

      const passwordCorrect = comparePassword(password, user.password);

      if (!passwordCorrect) {
        return res.status(400).json({
          status: "failed",
          message: "email or password incorrect"
        })
      }

      return res.status(201).json({
        status: "success",
        message: "User sucessfully logged in",
        data: user,
      });
    } catch (error) {
      return next(error);
    }
  }
);
router.post("/signout", (req, res) => { });
router.get("/currentUser", (req, res) => { });

export default router;
