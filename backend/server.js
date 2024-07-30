require('dotenv').config();

const express = require('express');
const workoutRoutes = require('./routes/workouts');
const mongoose = require('mongoose');

// Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(req.path, req.method, req.statusCode);
  next();
});

// Routes
app.use('/api/workouts', workoutRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Listen for requests
    app.listen(process.env.PORT, () => {
      console.log('Listening on port', process.env.PORT);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });