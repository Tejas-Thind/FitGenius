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
    const aiWorkouts = await AiWorkout.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json(aiWorkouts);
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

  const aiWorkout = await AiWorkout.findById(id);

  if (!aiWorkout) {
    return res.status(400).json({ error: "Personalised Workout not found" });
  }

  res.status(200).json(aiWorkout);
};

// POST a new Personalised Workout
const createAiWorkout = async (req, res) => {
  try {
    const { userInput } = req.body;
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ error: "User ID is missing" });
    }

    let emptyFields = [];

    if (!userInput) {
      emptyFields.push("Prompt");
    }

    if (emptyFields.length > 0) {
      return res.status(400).json({
        error: `Please fill in all fields: ${emptyFields.join(", ")}`,
        emptyFields,
      });
    }

    // Generate AI workout using OpenAI API
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "Generate a personalized 7-day workout plan based on the user's prompt. Include the following details for each workout: title, load (suggest that they find the right weight for 8-12 reps, struggling on the last few), sets, reps, equipment needed, and tips for proper form. Allow up to 2 rest days. Depending on the user's available workout time, provide 2-3 exercises per major muscle group per day (e.g., 3 chest and 3 tricep exercises for a 2-hour workout).",
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
    res.json(aiWorkout);
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    res.status(500).send("Something went wrong with OpenAI API");
  }
};

// DELETE a Personalised Workout
const deleteAiWorkout = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Personalised Workout not found" });
  }

  const aiWorkout = await AiWorkout.findOneAndDelete({ _id: id, userId });

  if (!aiWorkout) {
    return res.status(404).json({
      error:
        "Personalised workout not found or you are not authorized to delete this workout",
    });
  }

  res.status(200).json(aiWorkout);
};

module.exports = {
  allAiWorkouts,
  singleAiWorkout,
  createAiWorkout,
  deleteAiWorkout,
};
