const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const aiWorkoutSchema = new Schema(
  {
    workoutPlan: {
      type: Object,
      required: true,
    },
    userPrompt: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AiWorkout = mongoose.model("AiWorkout", aiWorkoutSchema);
module.exports = AiWorkout;
