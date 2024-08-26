import { useEffect } from "react";
import { useAiWorkoutsContext } from "../hooks/useAiWorkoutsContext";
import { supabase } from "../supabaseClient";

// components
import AiWorkoutSnippet from "../components/AiWorkoutSnippet";
import AiWorkoutForm from "../components/AiWorkoutForm";

const AiWorkouts = () => {
  const { aiWorkouts, dispatch } = useAiWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      document.title = "FitGenius | Personalised Workouts";
      const token = await supabase.auth
        .getSession()
        .then(({ data }) => data.session.access_token);

      const response = await fetch("/personalised-workouts/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_AIWORKOUTS", payload: json });
      }
    };

    fetchWorkouts();
  }, [dispatch]);

  return (
    <div className="instructions">
      <h2>Personalised Workouts</h2>
      <ul>
        <li>
          You can create a new personalised workout by entering a prompt below.
        </li>
        <li>
          Please provide detailed information in your prompt, such as your body
          weight, height, fitness goals, and the type of equipment or machines
          you have access to.
        </li>
        <li>
          The more specific you are, the better the personalized workout will
          be.
        </li>
      </ul>
      <br></br>
      <div className="home">
        <div className="workouts">
          {aiWorkouts.map((aiWorkout) => (
            <AiWorkoutSnippet aiWorkout={aiWorkout} key={aiWorkout._id} />
          ))}
        </div>
        <AiWorkoutForm />
      </div>
    </div>
  );
};

export default AiWorkouts;
