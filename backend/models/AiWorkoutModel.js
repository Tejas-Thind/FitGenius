const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const aiWorkoutSchema = new Schema(
  {
    workoutPlan: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AiWorkout', aiWorkoutSchema);