import express from "express";
import prisma from "../prisma";

const router = express.Router();

// POST create client
router.post("/create", async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const username = firstName[0].toLowerCase() + "." + lastName.toLowerCase();
  const newClient = await prisma.user.upsert({
    where: { email },
    update: {},
    create: { firstName, username, lastName, email }, // pour test : userId en dur
  });
  res.json(newClient);
});

export default router;
