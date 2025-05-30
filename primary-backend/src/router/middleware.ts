import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_PASSOWORD } from "../config";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization as unknown as string;
  try {
    const payload = jwt.verify(token, JWT_PASSOWORD);
    // @ts-ignore
    req.id = payload.id;
    next();
  } catch (e) {
    res.status(403).json({
      message: "You are not logged in",
    });
  }
};
