import express from "express";
import prisma from "../prisma";
const { userLogin, createUser } = require("../controllers/Users");

const router = express.Router();

// GET all clients
router.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

router.post("/login", userLogin);
router.post("/register", createUser);

export default router;
