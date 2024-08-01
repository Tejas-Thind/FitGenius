const router = require("express").Router();
const {
    allAiWorkouts,
    singleAiWorkout,
    createAiWorkout,
    deleteAiWorkout
} = require("../controllers/AiWorkoutController");

// Routes for AI generated workouts

// GET all personalised workouts
router.get("/personalised-workouts", allAiWorkouts);

// GET a single personalised workout
router.get("/personalised-workouts/:id", singleAiWorkout);

// POST a new personalised workout
router.post("/personalised-workouts", createAiWorkout);

// DELETE a personalised workout
router.delete("/personalised-workouts/:id", deleteAiWorkout);

module.exports = router;