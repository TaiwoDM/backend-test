import bcrypt from "bcrypt";
import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const hashPassword = (password: string): Promise<Boolean | string> => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

export const comparePassword = (
  password: string,
  hashed: string
): Promise<Boolean> => {
  return bcrypt.compare(password, hashed);
};


export const generateAndSendToken = (user: any, res: Response, statusCode: number) => {

  const token = jwt.sign({ email: user.email, admin: user.admin }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  });

  user.password = undefined;

  return res.status(statusCode).json({
    email: user.email,
    fullName: user.fullName,
    admin: user.admin
  });
};