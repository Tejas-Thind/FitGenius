const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// GET all workouts
const allWorkouts = async (req, res) => {
  try {
    const userId = req.user.id;
    const workouts = await Workout.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve workouts" });
  }
};

// GET a single workout
const singleWorkout = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Workout not found" });
  }

  const workout = await Workout.findOne({ _id: id, userId });

  if (!workout) {
    return res
      .status(400)
      .json({ error: "Workout not found or access denied" });
  }

  res.status(200).json(workout);
};

// POST a new wokrout
const createWorkout = async (req, res) => {
  // Destructuring
  const { title, load, sets, reps, notes } = req.body;
  console.log(req.user);
  const userId = req.user.id;

  if (!userId) {
    return res.status(400).json({ error: "User ID is missing" });
  }

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!sets) {
    emptyFields.push("sets");
  }
  if (!reps) {
    emptyFields.push("reps");
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: `Please fill in all fields: ${emptyFields.join(", ")}`,
      emptyFields,
    });
  }

  // Add workout to DB
  try {
    const workout = await Workout.create({
      title,
      load,
      sets,
      reps,
      notes,
      userId,
    });
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Workout not found" }); // Changed status code to 404
  }

  // Find and delete the workout by ID and user ID
  const workout = await Workout.findOneAndDelete({ _id: id, userId });

  if (!workout) {
    return res.status(404).json({
      error:
        "Workout not found or you are not authorized to delete this workout",
    });
  }

  res.status(200).json(workout);
};

// PATCH a workout
const editWorkout = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  // Validate workout ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Workout not found" });
  }

  // Update workout
  const workout = await Workout.findOneAndUpdate(
    { _id: id, userId }, // Ensure workout belongs to the user
    { ...req.body },
    { new: true } // Return the updated document
  );

  // Check if workout was found and updated
  if (!workout) {
    return res.status(404).json({
      error:
        "Workout not found or you are not authorized to update this workout",
    });
  }

  // Send successful response
  res.status(200).json({ workout, message: "Workout updated successfully" });
};

module.exports = {
  allWorkouts,
  singleWorkout,
  createWorkout,
  deleteWorkout,
  editWorkout,
};
