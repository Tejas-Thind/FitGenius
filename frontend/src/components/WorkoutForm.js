import { useState } from "react";

const WorkoutForm = () => {
  const [title, setTitle] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, sets, reps, load, notes };

    const response = await fetch("/api/workouts/", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
    }
    if (response.ok) {
      console.log("New workout added!");
      setError(null);
      setTitle("");
      setSets("");
      setReps("");
      setLoad("");
      setNotes("");
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
      />
      <label>Sets: </label>
      <input
        type="number"
        onChange={(e) => setSets(e.target.value)}
        value={sets}
      />
      <label>Reps: </label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />
      <label>Load (lbs): </label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
      />
      <label>Notes (Optional): </label>
      <input
        type="text"
        onChange={(e) => setNotes(e.target.value)}
        value={notes}
      />
      <div class="button-container">
        <button class="pushable">
          <span class="edge"></span>
          <span class="front">Create Workout</span>
        </button>
      </div>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
