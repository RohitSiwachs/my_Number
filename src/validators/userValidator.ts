// src/validators/userValidator.ts
import { z } from "zod";
import { Request, Response, NextFunction } from "express";

export const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
});

// Infer the type from the schema
export type CreateUserInput = z.infer<typeof createUserSchema>;

// Extend Request type to include validated property
interface ValidatedRequest extends Request {
  validated?: unknown;
}

export function validate<T>(schema: z.ZodSchema<T>) {
  return (req: ValidatedRequest, res: Response, next: NextFunction): void => {
    try {
      // parse throws on invalid; returns parsed data on success
      req.validated = schema.parse(req.body);
      next();
    } catch (err) {
      // ZodError: send readable errors
      if (err instanceof z.ZodError) {
        res.status(400).json({ error: err.issues });
        return;
      }
      res.status(400).json({ error: (err as Error).message });
    }
  };
}
