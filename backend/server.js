require("dotenv").config();
const express = require("express");
const cors = require("cors");
const workoutRoutes = require("./routes/workouts");
const AiWorkoutRoutes = require("./routes/AiWorkouts");
const mongoose = require("mongoose");
const authenticateToken = require("./middlewares/authToken");

const app = express();

// Define CORS options
const corsOptions = {
  origin: process.env.REACT_APP_FRONTEND_URL, // Update with your frontend URL
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Apply CORS settings
app.use(cors(corsOptions));

// Handle preflight requests
app.options("*", cors(corsOptions));

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
      // PORT is backend URL
      console.log("Listening on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
