import express from "express";
import path from "path";
import dotenv from "dotenv";

dotenv.config(); // load only your local .env

const app = express();
const PORT = process.env.PORT ?? 3000;

// Serve static frontend build
app.use(express.static(path.resolve("./dist")));

// SPA fallback: all other routes return index.html
app.get("*", (req, res) => {
  res.sendFile(path.resolve("./dist/index.html"));
});

app.listen(PORT, () => console.log(`Frontend running on port ${PORT}`));
