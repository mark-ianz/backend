import { z } from "zod";
import { UserCreateSchema } from "../schema/UserCreate";


export type UserCreate = z.infer<typeof UserCreateSchema>;
