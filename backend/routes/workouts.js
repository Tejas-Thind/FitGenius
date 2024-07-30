const router = require("express").Router();
const Workout = require("../models/workoutModel");

// GET all workouts
router.get("/", (req, res) => {
  res.json({ mssg: "Workouts endpoint" });
});

// GET a single workout
router.get("/:id", (req, res) => {
  //req.params.id
});

// POST a new wokrout
router.post("/", async (req, res) => {
  const { title, load, sets, reps } = req.body;
  try {
    const workout = await Workout.create({ title, load, sets, reps });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE a workout
router.delete("/:id", (req, res) => {});

// PATCH a workout
router.patch("/:id", (req, res) => {});

module.exports = router;
