import express from "express";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Listening to PORT" + PORT);
});

app.get("/", (req, res) => {
  res.send("hello");
});
