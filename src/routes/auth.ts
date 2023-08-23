import express, { Request, Response, NextFunction } from "express";

import { ErrorResponse } from "src/utils/errorHandler";

const router = express.Router();

router.post("/signup", (req: Request, res: Response, next: NextFunction) => {
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    const err: ErrorResponse = new Error("Provide all required details");
    err.statusCode = 400;
    err.status = "failed";
    return next(err);
  }

  return res.status(201).json({
    status: "success",
    message: "User sucessfully created",
  });
});
router.post("/signin", (req, res) => {});
router.post("/signout", (req, res) => {});
router.get("/currentUser", (req, res) => {});

export default router;
