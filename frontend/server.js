import express from "express";
import path from "path";
import dotenv from "dotenv";

dotenv.config(); // loads only your local .env

const app = express();
const PORT = process.env.PORT ?? 8080;

// Serve static files from build
app.use(express.static(path.resolve("./dist")));

// SPA fallback: any route returns index.html
app.get("*", (req, res) => {
  res.sendFile(path.resolve("./dist/index.html"));
});

app.listen(PORT, () => console.log(`Frontend running on port ${PORT}`));
