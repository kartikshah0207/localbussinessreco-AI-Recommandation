const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

if (!process.env.GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY is missing in .env file");
}

// eslint-disable-next-line no-console
console.log("Groq Key Loaded:", !!process.env.GROQ_API_KEY);

const { connectDB } = require("./config/db");
const businessRoutes = require("./routes/businessRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

connectDB();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"]
  })
);
app.use(express.json());

// Request logger (debug/demo)
app.use((req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  if (req.method !== "GET") {
    // eslint-disable-next-line no-console
    console.log("Incoming Body:", req.body);
  } else {
    // eslint-disable-next-line no-console
    console.log("Incoming Query:", req.query);
  }
  next();
});

app.use("/api/businesses", businessRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/auth", authRoutes);

// Basic health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Not found handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // Basic logging for now; in production you might use a real logger
  // eslint-disable-next-line no-console
  console.error(err);

  if (err.code === "LLM_BAD_RESPONSE" || err.code === "LLM_INVALID_JSON") {
    return res.status(502).json({
      message: "We couldn't generate recommendations right now. Please try again later."
    });
  }

  if (err.code === "LLM_NOT_CONFIGURED") {
    // Heuristic fallback should cover most cases; if it bubbles up, treat as server error
    return res.status(500).json({
      message: "Server configuration error. Please contact support."
    });
  }

  return res.status(500).json({
    message: "An unexpected error occurred. Please try again later."
  });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;

