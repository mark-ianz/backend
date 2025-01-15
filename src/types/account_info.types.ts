import { RowDataPacket } from "mysql2";

export type Account = {
  account_id: number;
  user_info_id: number;
  username: string;
  email: string;
  password?: string;
}

export type UserInfo = {
  user_info_id: number;
  first_name: string;
  middle_name?: string;
  last_name: string;
  gender: "male" | "female" | "prefer not to say";
  birthdate: Date;
  phone_number: string;
};

export type AccountInfo = Account & UserInfo & RowDataPacket;