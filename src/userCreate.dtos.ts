export type UserCreate = {
  username: string;
  email: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  password: string;
  gender: "male" | "female";
  birthdate: Date;
  phone_number: string;
}