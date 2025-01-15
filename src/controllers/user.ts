import { Request, Response } from "express";
import { UserCreate } from "../dtos/userCreate.dtos";
import { UserCreateSchema } from "../schema/UserCreate";
import { handleZodErrors } from "../helpers/validation";
import pool from "../connection/database";
import { ResultSetHeader } from "mysql2";
import { hashPassword } from "../helpers/hash";
import { GET_USER_ACCOUNT_INFO } from "../query/account.query";

export async function createUser(
  req: Request<{}, {}, UserCreate>,
  res: Response
) {
  const connection = await pool.getConnection();
  try {
    // destructure the datas from zod
    const {
      email,
      first_name,
      middle_name,
      last_name,
      gender,
      birthdate,
      phone_number,
      username,
      password,
    } = UserCreateSchema.parse(req.body);

    // start the transaction
    await connection.beginTransaction();

    // insert the data and destructure the result to get insertId
    const [{ insertId }] = await connection.query<ResultSetHeader>(
      "INSERT INTO user_info (first_name, middle_name, last_name, gender, birthdate, phone_number) VALUES (?, ?, ?, ?, ?, ?)",
      [first_name, middle_name, last_name, gender, birthdate, phone_number]
    );

    // hash the password
    const hashedPassword = hashPassword(password);

    // insert the data into account and use the insertId for foreign key
    await connection.query<ResultSetHeader>(
      "INSERT INTO `account` (`user_info_id`, `username`, email, `password`) VALUES (?, ?, ?, ?)",
      [insertId, username, email, hashedPassword]
    );

    // commit the data if all queries are success
    await connection.commit();

    res.status(201).json({ message: "User created successfully." });
    return;
  } catch (error) {
    // if there was an error, the query will rollback and won't save the previous query before error
    await connection.rollback();
    handleZodErrors(error, res);
    console.log(error);
  } finally {
    // if there was a connection found wether the query fails or not, release it after the try/catch block
    if (connection) connection.release();
  }
}

export async function getAccountInfo(
  req: Request<{ username: string }>,
  res: Response
) {
  try {
    const { username } = req.params;
    
    const connection = await pool.getConnection();

    const [result] = await connection.query<ResultSetHeader>(
      GET_USER_ACCOUNT_INFO,
      [username]
    );

    res.json(result);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "There was a server error. Please try again later." });
    return;
  }
}
