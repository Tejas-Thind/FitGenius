import { createContext, useReducer, useEffect } from "react";
import { supabase } from "../supabaseClient";

export const AiWorkoutsContext = createContext();

export const AiWorkoutsReducer = (state, action) => {
  switch (action.type) {
    case "SET_AIWORKOUTS":
      return { aiWorkouts: action.payload };
    case "CREATE_AIWORKOUT":
      return { aiWorkouts: [action.payload, ...state.aiWorkouts] };
    case "DELETE_AIWORKOUT":
      return {
        aiWorkouts: state.aiWorkouts.filter(
          (w) => w._id !== action.payload._id
        ),
      };
    case "UPDATE_AIWORKOUT":
      return {
        aiWorkouts: state.aiWorkouts.map((w) =>
          w._id === action.payload._id ? action.payload : w
        ),
      };
    default:
      return state;
  }
};

export const AiWorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AiWorkoutsReducer, { aiWorkouts: [] });

  useEffect(() => {
    const fetchAiWorkouts = async () => {
      try {
        // Fetch the session from Supabase
        const { data } = await supabase.auth.getSession();
        const session = data.session;
        // console.log("Session:", session); // debugging

        if (!session || !session.access_token) {
          throw new Error("No session or access token found");
        }

        const token = session.access_token;
        //console.log("Token:", token); // debugging

        const response = await fetch("/personalised-workouts/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const json = await response.json();
        // console.log("Fetched workouts:", json); // Debugging
        dispatch({ type: "SET_AIWORKOUTS", payload: json });
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    fetchAiWorkouts();
  }, []);

  return (
    <AiWorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AiWorkoutsContext.Provider>
  );
};
