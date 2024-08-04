import { useState } from "react";

const WorkoutForm = () => {
  const [title, setTitle] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [load, setload] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, sets, reps, load, notes };

    const response = await fetch("/api/workouts/", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      }
    })

    const data = await response.json();
    
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>New Workout</h3>

      <label>Excersize Title: </label>
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
      <button>Create Workout</button>
    </form>
  );
};

export default WorkoutForm;
