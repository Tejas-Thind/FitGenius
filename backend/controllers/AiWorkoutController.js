const AiWorkout = require("../models/AiWorkoutModel");
const mongoose = require("mongoose");
const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

// GET all Ai workouts
const allAiWorkouts = async (req, res) => {
  try {
    const userId = req.user.id;
    const AiWorkouts = await AiWorkout.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json(workouts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve Personalised workouts" });
  }
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
  try {
    const userInput = req.body;
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ error: "User ID is missing" });
    }

    // Generate AI workout using OpenAI API
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You will provide a personalised workout for the user depending on their prompt. You will make it in the format of: title, load, sets, reps, and equipment needed",
        },
        { role: "user", content: userInput },
      ],
      model: "gpt-3.5-turbo",
    });

    // Extract the AI-generated workout content
    const aiWorkoutContent = completion.choices[0].message.content;

    // Save the AI workout to the database
    const aiWorkout = await AiWorkout.create({
      workoutPlan: aiWorkoutContent,
      userPrompt: userInput,
      userId: userId,
    });

    // Return the AI-generated workout content as a response
    res.json({ response: aiWorkoutContent });
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    res.status(500).send("Something went wrong with OpenAI API");
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
