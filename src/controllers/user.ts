import { Request, Response } from "express";
import { UserCreate } from "../dtos/userCreate.dtos";
import { UserCreateSchema } from "../schema/UserCreate";
import { z } from "zod";

export function createUser(req: Request<{}, {}, UserCreate>, res: Response) {
  try {
    const user = UserCreateSchema.parse(req.body);

    res.json({ user });
  } catch (error) {
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
  }
}
