require("dotenv").config();
const express = require("express");
const cors = require("cors");
const workoutRoutes = require("./routes/workouts");
const AiWorkoutRoutes = require("./routes/AiWorkouts");
const mongoose = require("mongoose");
const authenticateToken = require("./middlewares/authToken");

const app = express();

// Middleware
const allowedOrigins = process.env.REACT_APP_FRONTEND_URLS.split(",");
app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);
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
