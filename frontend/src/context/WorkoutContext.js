import { createContext, useReducer } from "react";

export const WorkoutContext = createContext();

export const workoutsReducer = (state, action) => {
  // state is the previous state, action is the new state
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload, // action.payload is the new state which is an array of workouts
      };
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts] 
      };
    default:
      return state;
  }
};

export const WorkoutsContextProvider = ({ children }) => {
  // children represents the app component that I wrapped inside the index file
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
  });

  return (
    <WorkoutsContext.Provider value={{ state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};

/*WorkoutContext: The context for managing workouts.
workoutsReducer: Defines how the state of workouts changes in response to different actions.
WorkoutsContextProvider: Provides the workouts state and the dispatch function to the components in your app. This allows components to read the workouts state and dispatch actions to update it.*/
