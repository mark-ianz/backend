import express from "express";
import "dotenv/config";
import userRoutes from "./routes/user";

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

app.use("/api/user", userRoutes);
