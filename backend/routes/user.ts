import express, { Request, Response } from "express";
const router = express.Router();
import UserModel from "../models/user";

router.get("/getUsers", async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(401).send(error.message).end();
  }
});

router.post("/addUser", async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      throw new Error("Invalid request");
    }
    const newUser = new UserModel(req.body);
    await newUser.save();

    res.status(200).end();
  } catch (error: any) {
    res.status(400).send(error.message).end();
  }
});

export default router;
