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

app.use("/api/user", userRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found." });
  return;
});
