// server/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./db.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import exphbs from "express-handlebars";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect MongoDB
connectDB();

// ES Modules fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hbs = require('hbs');

hbs.registerHelper('formatDate', function(date) {
  if(!date) return '';
  return new Date(date).toLocaleDateString();
});


app.engine("hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "templates"));

// Serve frontend build
app.use(express.static(path.join(__dirname, "../client/dist")));

// API routes
app.use("/api", resumeRoutes);

// Catch-all for React routing (Express 5 safe)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// Use Render port or default
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
