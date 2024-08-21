import { createContext, useReducer, useEffect } from "react";
import { supabase } from "../supabaseClient";

export const WorkoutsContext = createContext();

export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return { workouts: action.payload };
    case "CREATE_WORKOUT":
      return { workouts: [action.payload, ...state.workouts] };
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter((w) => w._id !== action.payload._id),
      };
    case "UPDATE_WORKOUT":
      return {
        workouts: state.workouts.map((w) =>
          w._id === action.payload._id ? action.payload : w
        ),
      };
    default:
      return state;
  }
};

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, { workouts: [] });

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        // Fetch the session from Supabase
        const { data } = await supabase.auth.getSession();
        const session = data.session;
        // console.log("Session:", session);

        if (!session || !session.access_token) {
          throw new Error("No session or access token found");
        }

        const token = session.access_token;
        //console.log("Token:", token);

        const response = await fetch("/api/workouts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const json = await response.json();
        // console.log("Fetched workouts:", json); // Debugging
        dispatch({ type: "SET_WORKOUTS", payload: json });
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
