import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { supabase } from "../supabaseClient";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Extract the session to get the token
    const { data } = await supabase.auth.getSession();
    const token = data.session.access_token;

    // Construct the workout object
    const workout = { title, sets, reps, load, notes };

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/workouts/`, {
        method: "POST",
        body: JSON.stringify(workout),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the Bearer token in the request
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        setEmptyFields(data.emptyFields || []);
      }

      if (response.ok) {
        console.log("New workout added!");
        setError(null);
        setTitle("");
        setSets("");
        setReps("");
        setLoad("");
        setNotes("");
        setEmptyFields([]);
        dispatch({ type: "CREATE_WORKOUT", payload: data });
      }
    } catch (error) {
      console.error("Error adding workout:", error);
      setError("Something went wrong!");
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>New Workout</h3>

      <label>Exercise Title: </label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Sets: </label>
      <input
        type="number"
        onChange={(e) => setSets(e.target.value)}
        value={sets}
        className={emptyFields.includes("sets") ? "error" : ""}
      />

      <label>Reps: </label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes("reps") ? "error" : ""}
      />

      <label>Load (lbs): </label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes("load") ? "error" : ""}
      />

      <label>Notes (Optional): </label>
      <input
        type="text"
        onChange={(e) => setNotes(e.target.value)}
        value={notes}
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
