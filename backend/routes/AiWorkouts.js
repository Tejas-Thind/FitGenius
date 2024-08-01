const router = require("express").Router();
const {
  allAiWorkouts,
  singleAiWorkout,
  createAiWorkout,
  deleteAiWorkout,
} = require("../controllers/AiWorkoutController");

// Routes for AI generated workouts

// GET all personalised workouts
router.get("/", allAiWorkouts);

// GET a single personalised workout
router.get("/:id", singleAiWorkout);

// POST a new personalised workout
router.post("/", createAiWorkout);

// DELETE a personalised workout
router.delete("/:id", deleteAiWorkout);

module.exports = router;
