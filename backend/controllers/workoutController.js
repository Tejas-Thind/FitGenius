const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// GET all workouts
const allWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });

  res.status(200).json(workouts);
};

// GET a single workout
const singleWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Workout not found" });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(400).json({ error: "Workout not found" });
  }

  res.status(200).json(workout);
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
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  const workout = await Workout.findByIdAndDelete(id);
};

// PATCH a workout
const editWorkout = (req, res) => {};

module.exports = {
  allWorkouts,
  singleWorkout,
  createWorkout,
  deleteWorkout,
  editWorkout,
};
