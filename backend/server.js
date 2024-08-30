require("dotenv").config();
const express = require("express");
const cors = require("cors");
const workoutRoutes = require("./routes/workouts");
const AiWorkoutRoutes = require("./routes/AiWorkouts");
const mongoose = require("mongoose");
const authenticateToken = require("./middlewares/authToken");

const app = express();

// Parse allowed origins
const allowedOrigins = [
  "http://127.0.0.1:3000", // Localhost
  "http://localhost:3000", // Localhost
  "https://fit-genius-hhyt.vercel.app", // Vercel frontend domain
];

// Configure CORS
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Apply CORS settings to all routes
app.use(cors(corsOptions));

// Handle preflight requests
app.options("*", cors(corsOptions));

// Set Referrer-Policy header for all responses
app.use((req, res, next) => {
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(req.path, req.method, req.statusCode);
  next();
});

// Apply authenticateToken middleware to protect these routes
app.use("/api/workouts", authenticateToken, workoutRoutes);
app.use("/personalised-workouts", authenticateToken, AiWorkoutRoutes);

// Connect to MongoDB
mongoose
  .set("strictQuery", false)
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log("Listening on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
