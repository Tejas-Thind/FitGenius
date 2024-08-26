import { useAiWorkoutsContext } from "../hooks/useAiWorkoutsContext";
import { supabase } from "../supabaseClient";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const AiWorkoutDetails = ({ aiWorkout }) => {
  const { dispatch } = useAiWorkoutsContext();

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

  return (
    <div className="workout-details">
      <div>
        <a
          href={`/personalised-workouts/${aiWorkout._id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <h2>Personalised Workout</h2>
        </a>
      </div>
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
