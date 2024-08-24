import { useAiWorkoutsContext } from "../hooks/useAiWorkoutsContext";
import { supabase } from "../supabaseClient";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useState, useEffect } from "react";

const AiWorkoutDetails = ({ aiWorkout }) => {
  const { dispatch } = useAiWorkoutsContext();
  const [loading, setLoading] = useState(true);
  const [formattedWorkoutPlan, setFormattedWorkoutPlan] = useState("");

  const handleClick = async () => {
    const token = await supabase.auth
      .getSession()
      .then(({ data }) => data.session.access_token);

    const response = await fetch(`/personalised-workouts/${aiWorkout._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_AIWORKOUT", payload: json });
      console.log("Personalised Workout Deleted!");
    }
  };

  useEffect(() => {
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
  }, [aiWorkout]);

  return (
    <div className="workout-details">
      {loading ? (
        <div>
          <p>Loading workout details, please wait...</p>
        </div>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: formattedWorkoutPlan }} />
      )}
      <p>
        <strong>Created: </strong>
        {formatDistanceToNow(new Date(aiWorkout.createdAt), {
          addSuffix: true,
        })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default AiWorkoutDetails;
