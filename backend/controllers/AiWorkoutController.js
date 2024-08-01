const AiWorkout = require("../models/AiWorkoutModel");
const mongoose = require("mongoose");

// GET all Ai workouts
const allAiWorkouts = async (req, res) => {
  const workouts = await AiWorkout.find({}).sort({ createdAt: -1 });

  res.status(200).json(workouts);
};

// GET a single Ai Workouts
const singleAiWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Personalised Workout not found" });
  }

  const AiWorkout = await AiWorkout.findById(id);

  if (!AiWorkout) {
    return res.status(400).json({ error: "Personalised Workout not found" });
  }

  res.status(200).json(AiWorkout);
};

// POST a new Personalised Workout
const createAiWorkout = async (req, res) => {
  // Destructuring
  const { title, load, sets, reps } = req.body;
  // Add AiWorkout to DB
  try {
    const AiWorkout = await AiWorkout.create({ title, load, sets, reps });
    res.status(200).json(AiWorkout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE a Personalised Workout
const deleteAiWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Personalised Workout not found" });
  }

  const AiWorkout = await AiWorkout.findOneAndDelete({ _id: id });

  if (!AiWorkout) {
    return res.status(400).json({ error: "Personalised Workout not found" });
  }

  res
    .status(200)
    .json({ AiWorkout, message: "Personalised Workout deleted successfully" });
};

module.exports = {
  allAiWorkouts,
  singleAiWorkout,
  createAiWorkout,
  deleteAiWorkout,
};
