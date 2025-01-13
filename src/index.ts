import express, { Request, Response } from "express";
import "dotenv/config";
import { UserCreate } from "./userCreate.dtos";

const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded());
app.use(express.json());

app.listen(PORT, () => {
  console.log("Listening to PORT " + PORT);
});

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/api/user", (req: Request<{}, {}, UserCreate>, res: Response) => {
  const username = req.body.username;
  res.json(username);
});
