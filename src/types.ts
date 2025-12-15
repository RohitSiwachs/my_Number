// src/types.ts
import { Request } from "express";
import { z } from "zod";

// Extend Express Request to include validated property
export interface ValidatedRequest<T = unknown> extends Request {
  validated: T;
}

// Type for user creation data
export type CreateUserData = {
  email: string;
  name?: string;
};
