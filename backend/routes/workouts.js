const router = require("express").Router();
const {
  allWorkouts,
  singleWorkout,
  createWorkout,
  deleteWorkout,
  editWorkout,
} = require("../controllers/workoutController");

// GET all workouts
router.get("/", allWorkouts);

// GET a single workout
router.get("/:id", singleWorkout);

// POST a new wokrout
router.post("/", createWorkout);

// DELETE a workout
router.delete("/:id", deleteWorkout);

// PATCH a workout
router.patch("/:id", editWorkout);

module.exports = router;
