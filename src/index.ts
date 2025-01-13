import express, { Request, Response } from "express";
import "dotenv/config";
import { UserCreate, UserCreateSchema } from "./userCreate.dtos";
import { z } from "zod";

const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
  console.log("Listening to PORT " + PORT);
});

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/api/user", (req: Request<{}, {}, UserCreate>, res: Response) => {
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
});
