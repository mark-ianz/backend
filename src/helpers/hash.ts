import bcrypt from "bcrypt";

export function hashPassword(password: string) {
  const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUND));
  return bcrypt.hashSync(password, salt);
}
