import { useState } from "react";
import { useAiWorkoutsContext } from "../hooks/useAiWorkoutsContext";
import { supabase } from "../supabaseClient";

const WorkoutForm = () => {
  const { dispatch } = useAiWorkoutsContext();
  const [userPrompt, setUserPrompt] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Please allow a few seconds for the workout to appear.");

    // Extract the session to get the token
    const { data } = await supabase.auth.getSession();
    const token = data.session.access_token;

    // Construct the workout object
    const aiWorkout = { userInput: userPrompt };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/personalised-workouts/`,
        {
          method: "POST",
          body: JSON.stringify(aiWorkout),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        setEmptyFields(data.emptyFields || []);
        console.log("Error adding personalised workout:", data.error);
      }

      if (response.ok) {
        console.log("New personalised workout added!");
        setError(null);
        setUserPrompt("");
        setEmptyFields([]);
        dispatch({ type: "CREATE_AIWORKOUT", payload: data });
      }
    } catch (error) {
      console.error("Error adding personalised workout:", error);
      setError("Something went wrong!");
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>New Personalised Workout</h3>

      <label>Enter Prompt: </label>
      <textarea
        type="text"
        onChange={(e) => setUserPrompt(e.target.value)}
        value={userPrompt}
        className={emptyFields.includes("Prompt") ? "error" : ""}
      />

      <div className="button-container">
        <button className="pushable">
          <span className="edge"></span>
          <span className="front">Create Workout</span>
        </button>
      </div>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
