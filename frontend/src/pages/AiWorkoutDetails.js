import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAiWorkoutsContext } from "../hooks/useAiWorkoutsContext";

const AiWorkoutDetails = () => {
  const { id } = useParams();
  const { aiWorkouts } = useAiWorkoutsContext();

  const [aiWorkout, setAiWorkout] = useState(null); // Set initial state to null
  const [loading, setLoading] = useState(true);
  const [formattedWorkoutPlan, setFormattedWorkoutPlan] = useState("");

  useEffect(() => {
    if (aiWorkouts.length > 0) {
      const selectedWorkout = aiWorkouts.find((workout) => workout._id === id);
      if (selectedWorkout) {
        setAiWorkout(selectedWorkout);
      }
    }
  }, [id, aiWorkouts]);

  useEffect(() => {
    if (aiWorkout) {
      setLoading(true); // Show loading while formatting
      setTimeout(() => {
        const workoutPlan = aiWorkout.workoutPlan;
        const lines = workoutPlan.split("\n");
        let formattedPlan = "<div style='line-height: 1.6;'>";

        lines.forEach((line) => {
          if (line.startsWith("**")) {
            if (line.includes("Day")) {
              formattedPlan += `<h2 style="font-size: 1.5em; font-weight: bold; margin-bottom: 15px;">${line.replace(
                /\*\*/g,
                ""
              )}</h2>`;
            } else {
              formattedPlan += `<h3 style="font-size: 1.2em; font-weight: bold; margin-top: 15px; margin-bottom: 10px;">${line.replace(
                /\*\*/g,
                ""
              )}</h3>`;
            }
          } else if (line.includes("Rest Day")) {
            formattedPlan += `<div style="margin-top: 20px; margin-bottom: 20px; font-style: italic;">${line}</div>`;
          } else if (line.trim() !== "") {
            formattedPlan += `<p style="margin-left: 20px; margin-bottom: 10px;">${line}</p>`;
          }
        });

        formattedPlan += "</div>";
        setFormattedWorkoutPlan(formattedPlan);
        setLoading(false);
      }, 2000);
    }
  }, [aiWorkout]);

  return (
    <div className="workout-details">
      {loading ? (
        <div>
          <p>Loading workout details, please wait...</p>
        </div>
      ) : (
        <>
          <div dangerouslySetInnerHTML={{ __html: formattedWorkoutPlan }} />
        </>
      )}
    </div>
  );
};

export default AiWorkoutDetails;
