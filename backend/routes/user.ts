import express, { Request, Response } from "express";
const router = express.Router();
import UserModel from "../models/user";

router.get("/getUsers", async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    users.forEach((user:any) => {
      user._id = user._id.toString();
    });
    res.status(200).json(users);
  } catch (error: any) {
    res.status(401).send(error.message).end();
  }
});

export default router;
