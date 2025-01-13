import { Response } from "express";
import { z } from "zod";

export function handleZodErrors(error: Error | unknown, res: Response) {
  if (error instanceof z.ZodError) {
    const formattedErrors = error.errors.map((err) => ({
      path: err.path[0],
      message: err.message,
    }));

    res.status(400).json({ errors: formattedErrors });
    return;
  }

  res
    .status(500)
    .json({ message: "There was a server error. Please try again later." });
  return;
}
