import { Request, Response } from "express";
import { UserCreate } from "../dtos/userCreate.dtos";
import { UserCreateSchema } from "../schema/UserCreate";
import { handleZodErrors } from "../helpers/validation";

export function createUser(req: Request<{}, {}, UserCreate>, res: Response) {
  try {
    const user = UserCreateSchema.parse(req.body);
    res.json({ user });
  } catch (error) {
    handleZodErrors(error, res);
  }
}
