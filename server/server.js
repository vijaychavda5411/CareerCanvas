// server/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { create as createHandlebars } from "express-handlebars";
import connectDB from "./db.js";
import resumeRoutes from "./routes/resumeRoutes.js";

// Load environment variables
dotenv.config();

// Express app
const app = express();
app.use(cors({
  origin: ["https://careercanvas-1-2w94.onrender.com", "http://localhost:5173"],
  methods: ["GET", "POST"]
}));
app.use(express.json());
app.use(cors());

// Connect MongoDB
connectDB();

// Fix __dirname and __filename in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Handlebars setup — no layout, with helper
const hbs = createHandlebars({
  extname: ".hbs",
  defaultLayout: false,
  helpers: {
    formatDate: (date) => (date ? new Date(date).toLocaleDateString() : ""),
  },
});

// ✅ Register engine properly
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

// ✅ Set views folder (where your .hbs templates are)
app.set("views", path.join(__dirname, "templates"));

// ✅ Serve React build (client)
app.use(express.static(path.join(__dirname, "../client/dist")));

// ✅ API routes
app.use("/api", resumeRoutes);

// ✅ Fallback route for React Router
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
