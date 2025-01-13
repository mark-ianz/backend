import { z } from "zod";

const min_username_length = Number(process.env.MINIMUM_USERNAME_LENGTH);
const min_password_length = Number(process.env.MINIMUM_PASSWORD_LENGTH);
const phone_number_length = Number(process.env.PHONE_NUMBER_LENGTH);

export const UserCreateSchema = z.object({
  username: z
    .string()
    .trim()
    .nonempty({ message: "Username is required." })
    .min(min_username_length, {
      message: `Minimum username length is ${min_username_length}.`,
    }),
  email: z.string().trim().email({ message: "Invalid email format." }),
  first_name: z.string().min(1, { message: "First name is required" }),
  middle_name: z.string().optional(),
  last_name: z.string().min(1, { message: "Last name is required" }),
  password: z.string().min(min_password_length, {
    message: `Password must be at least ${min_password_length} characters long.`,
  }),
  gender: z.enum(["male", "female"], { message: "Invalid gender." }),
  birthdate: z
    .string()
    .min(1, { message: "Birthdate is required." })
    .refine((birthdate) => !isNaN(Date.parse(birthdate)), {
      message: "Invalid format.",
    })
    .transform((birthdate) => new Date(birthdate)),
  phone_number: z
    .string()
    .length(phone_number_length, {
      message: "Phone number must be 11 digits.",
    })
    .refine((p) => /^\d+$/.test(p), {
      message: "Phone number must only contain digits.",
    }),
});