// src/routes/user.ts
import express, { Request, Response } from "express";
import prisma from "../db";
import { createUserSchema, validate, CreateUserInput } from "../validators/userValidator";

const router = express.Router();

// Extend Request type to include validated property
interface ValidatedRequest extends Request {
  validated?: CreateUserInput;
}

// Create user
router.post("/", validate(createUserSchema), async (req: ValidatedRequest, res: Response): Promise<void> => {
  try {
    const data = req.validated;
    if (!data) {
      res.status(400).json({ error: "Validation failed" });
      return;
    }
    const user = await prisma.user.create({ data });
    res.status(201).json(user);
  } catch (err) {
    // handle unique constraint or others
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Read users
router.get("/", async (_req: Request, res: Response): Promise<void> => {
  const users = await prisma.user.findMany();
  res.json({ users });
});

export default router;
