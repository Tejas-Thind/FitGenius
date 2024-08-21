import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { supabase } from "../supabaseClient";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();

  const handleClick = async () => {
    const token = await supabase.auth
      .getSession()
      .then(({ data }) => data.session.access_token);

    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
      console.log("Workout Deleted!");
    }
  };

  return (
    <div className="workout-details">
      <a
        href={`/edit/${workout._id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <h3>{workout.title}</h3>
      </a>
      <p>
        <strong>Load: </strong>
        {workout.load}
      </p>
      <p>
        <strong>Sets: </strong>
        {workout.sets}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        <strong>Notes: </strong>
        {workout.notes}
      </p>
      <p>
        <strong>Created: </strong>
        {formatDistanceToNow(new Date(workout.createdAt), {
          addSuffix: true,
        })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
