import express from "express";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.static(path.resolve("./dist")));

// SPA fallback for React
app.get("*", (req, res) => {
  res.sendFile(path.resolve("./dist/index.html"));
});

app.listen(PORT, () => console.log(`Frontend running on port ${PORT}`));
