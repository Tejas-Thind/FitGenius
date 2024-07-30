const Workout = require("../models/workoutModel");

// GET all workouts
const allWorkouts = (req, res) => {
  res.json({ mssg: "Workouts endpoint" });
};

// GET a single workout
const singleWorkout = (req, res) => {
  //req.params.id
};

// POST a new wokrout
const createWorkout = async (req, res) => {
  // Destructuring
  const { title, load, sets, reps } = req.body;
  // Add workout to DB
  try {
    const workout = await Workout.create({ title, load, sets, reps });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE a workout
const deleteWorkout = (req, res) => {};

// PATCH a workout
const editWorkout = (req, res) => {};

module.exports = {
  allWorkouts,
  singleWorkout,
  createWorkout,
  deleteWorkout,
  editWorkout,
};
