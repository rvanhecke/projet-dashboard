import { Request, Response } from "express";
import prisma from "../prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const salt = await bcrypt.genSalt(10);

module.exports.createUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email }: any = req.body;
    const username: string =
      firstName[0].toLowerCase() + "." + lastName.toLowerCase();
    const password = await bcrypt.hash("ChangeMe123*", salt);
    const newUser = await prisma.user.upsert({
      where: { email },
      update: {},
      create: { firstName, username, lastName, email }, // pour test : userId en dur
    });
    res.json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.userLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
      x,
    });
    if (user) {
      const comparedPassword = bcrypt.compare(password, user.password);
    }
    res.status(200).json({ valid: true, user: username });
  } catch (error) {
    console.error(error);
    res.status(403).send(`No user named ${username}`);
  }
};

module.exports.changePassword = async (req: Request, res: Response) => {
  const oldPassword = req.body.password;
};
