import { Response } from "express";
import { z } from "zod";

export function handleZodErrors(error: z.ZodError, res: Response) {
  const formattedErrors = error.errors.map((err) => ({
    path: err.path[0],
    message: err.message,
  }));

  res.status(400).json({ errors: formattedErrors });
}

export function throwServerError(res: Response) {
  res
    .status(500)
    .json({ message: "There was a server error. Please try again later." });
}
