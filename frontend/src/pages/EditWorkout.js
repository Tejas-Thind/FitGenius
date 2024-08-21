import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { supabase } from "../supabaseClient";

const EditWorkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { workouts = [], dispatch } = useWorkoutsContext();

  const [workout, setWorkout] = useState(null);
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [notes, setNotes] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const saveWorkout = async () => {
    const token = await supabase.auth
      .getSession()
      .then(({ data }) => data.session.access_token);

    const updatedWorkout = { title, load, sets, reps, notes };
    const response = await fetch("/api/workouts/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedWorkout),
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "UPDATE_WORKOUT", payload: json.workout });
      console.log(json.message);
      setIsEditing(false);
      navigate("/");
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const resetChanges = () => {
    if (workout) {
      setTitle(workout.title);
      setLoad(workout.load);
      setSets(workout.sets);
      setReps(workout.reps);
      setNotes(workout.notes);
    }
  };

  useEffect(() => {
    if (workouts.length > 0) {
      // Ensure workouts are loaded
      const selectedWorkout = workouts.find((workout) => workout._id === id);
      if (selectedWorkout) {
        setWorkout(selectedWorkout);
        setTitle(selectedWorkout.title);
        setLoad(selectedWorkout.load);
        setSets(selectedWorkout.sets);
        setReps(selectedWorkout.reps);
        setNotes(selectedWorkout.notes);
      }
    }
  }, [id, workouts]);

  if (!workout) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-workout">
      <h2 className="form-title">Edit Workout</h2>
      <form>
        <label htmlFor="title">Exercise Title: </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          readOnly={!isEditing}
          className={isEditing ? "editable-input" : "non-editable-input"}
        />

        <label htmlFor="sets">Sets: </label>
        <input
          type="number"
          id="sets"
          name="sets"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
          readOnly={!isEditing}
          className={isEditing ? "editable-input" : "non-editable-input"}
        />

        <label htmlFor="reps">Reps: </label>
        <input
          type="number"
          id="reps"
          name="reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          readOnly={!isEditing}
          className={isEditing ? "editable-input" : "non-editable-input"}
        />

        <label htmlFor="load">Load (kg): </label>
        <input
          type="number"
          id="load"
          name="load"
          value={load}
          onChange={(e) => setLoad(e.target.value)}
          readOnly={!isEditing}
          className={isEditing ? "editable-input" : "non-editable-input"}
        />

        <label htmlFor="notes">Notes: </label>
        <textarea
          id="notes"
          name="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          readOnly={!isEditing}
          className={isEditing ? "editable-input" : "non-editable-input"}
        />

        <div className="edit-buttons-wrapper">
          <div className="edit-button-wrapper">
            <button
              className="edit-buttons"
              type="button"
              onClick={resetChanges}
            >
              <span className="edit-button-edge"></span>
              <span className="edit-button-front">Reset</span>
            </button>
          </div>

          <div className="edit-button-wrapper">
            <button
              className="edit-buttons"
              type="button"
              onClick={toggleEditMode}
            >
              <span className="edit-button-edge"></span>
              <span className="edit-button-front">
                {isEditing ? "Cancel" : "Edit"}
              </span>
            </button>
          </div>

          <div className="edit-button-wrapper">
            <button
              className="edit-buttons"
              type="button"
              onClick={saveWorkout}
            >
              <span className="edit-button-edge"></span>
              <span className="edit-button-front">Update Workout</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditWorkout;
