import { Request, Response } from "express";
import prisma from "../prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const salt = 10;

module.exports.createUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email }: any = req.body;
    const username: string =
      firstName[0].toLowerCase() + "." + lastName.toLowerCase();
    const password = await bcrypt.hash("ChangeMe123*", salt);
    const newUser = await prisma.user.upsert({
      where: { email },
      update: {},
      create: { firstName, username, lastName, email, password },
    });
    res.json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.userLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: "Need username and password" });

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!user)
      return res
        .status(401)
        .json({ valid: false, message: "User or password incorrect" });

    const comparedPassword = await bcrypt.compare(password, user.password);
    if (!comparedPassword)
      return res
        .status(401)
        .json({ valid: false, message: "User or password incorrect" });

    res.status(200).json({ valid: true, user: username });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

module.exports.changePassword = async (req: Request, res: Response) => {
  const oldPassword = req.body.password;
};
