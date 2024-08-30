require("dotenv").config();
const express = require("express");
const cors = require("cors");
const workoutRoutes = require("./routes/workouts");
const AiWorkoutRoutes = require("./routes/AiWorkouts");
const mongoose = require("mongoose");
const authenticateToken = require("./middlewares/authToken");

const app = express();

// Middleware

// Get allowed origins from environment variable
const allowedOrigins = process.env.REACT_APP_FRONTEND_URL.split(',');

// Configure CORS
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true // if you want to support cookies or authentication
}));

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
