import { Router, Request, Response } from "express";
import { authMiddleware } from "./middleware";
import { SigninSchema, SignupSchema } from "../types";
import { prismaClient } from "../db";
import jwt from "jsonwebtoken";
import { JWT_PASSOWORD } from "../config";

const router = Router();


router.post("/signup", async (req: Request, res: Response): Promise<void> => {
  const body = req.body;
  const parsedData = SignupSchema.safeParse(body);

  console.log("reached here")

  if (!parsedData.success) {
    res.status(411).json({ message: "Incorrect data" });
    return;
  }

  const userExists = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.username,
    },
  });

  if (userExists) {
    res.status(403).json({ message: "User already exists" });
    return;
  }

  await prismaClient.user.create({
    data: {
      email: parsedData.data.username,
      // hash the password ,dont store it in plain text
      password: parsedData.data.password,
      name: parsedData.data.name,
    },
  });

  res.json({ message: "Please verify your email by checking your email" });
});

router.post("/signin", async (req: Request, res: Response): Promise<void> => {
  const body = req.body;
  const parsedData = SigninSchema.safeParse(body);

  if (!parsedData.success) {
    res.status(411).json({ message: "Incorrect inputs" });
    return;
  }

  const user = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.username,
      password: parsedData.data.password,
    },
  });

  if (!user) {
    res.status(403).json({ message: "User not found Please Signup" });
    return;
  }

  //  sign the jwt
  const token = jwt.sign({ id: user.id }, JWT_PASSOWORD);

  res.json({
    token: token,
  });
});

// @ts-ignore
router.get("/", authMiddleware, async (req: Request, res: Response) => {
  // @ts-ignore
  const id = req.id;
  const user = await prismaClient.user.findFirst({
    where: {
      id: id,
    },
    select: {
      name: true,
      email: true,
    },
  });

  return res.json({
    user
  });
});

export const userRouter = router;
