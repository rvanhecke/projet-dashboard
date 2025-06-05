import {Request, Response} from "express";
import prisma from "../prisma";

module.exports.createClient = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, phone }: any = req.body;
        const newClient = await prisma.client.upsert({
            where: { email },
            update: {},
            create: { firstName, lastName, email, phone }, // pour test : userId en dur
        });
        res.json(newClient);
    } catch (error) {
        console.error("Error creating client:", error)
        res.status(500).json({ error: "Internal server error" })
    }
}

