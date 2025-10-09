import express from "express";
import path from "path";
import dotenv from "dotenv";

dotenv.config(); // load .env variables

const app = express();
const PORT = process.env.PORT ?? 3000; // Railway provides PORT in production

// Serve static files from Vite build
app.use(express.static(path.resolve("./dist")));

// Always return index.html for SPA routing
app.get("*", (req, res) => {
  res.sendFile(path.resolve("./dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Frontend running on port ${PORT}`);
});
