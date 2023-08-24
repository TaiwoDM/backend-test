import express, { Request, Response, NextFunction } from "express";

import { ErrorResponse } from "src/utils/errorHandler";
import { hashPassword, comparePassword } from "src/utils/auth";
import User from "src/models/User";

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
        throw err;
      }

      const encryptedPassword = await hashPassword(password);

      const newUser = await User.create({
        email,
        fullName,
        password: encryptedPassword,
      });

      return res.status(201).json({
        status: "success",
        message: "User sucessfully created",
        data: newUser,
      });
    } catch (error) {
      throw error;
    }
  }
);
router.post("/signin", (req, res) => {});
router.post("/signout", (req, res) => {});
router.get("/currentUser", (req, res) => {});

export default router;
