require('dotenv').config();

const express = require('express');
const workoutRoutes = require('./routes/workouts')

// Express app
const app = express();

app.use((req, res, next) => {
    console.log(req.path, res.method, res.statusCode);
    next();
});

// Routes
app.use('/api/workouts',workoutRoutes);

// Listen for requests
app.listen(process.env.PORT, () => {
    console.log('Listening on port', process.env.PORT)
});