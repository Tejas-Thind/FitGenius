import { createContext, useReducer } from 'react';

export const WorkoutContext = createContext();

export const workoutsReducer = (state, action) => {

}

export const WorkoutsContextProvider = ({ children }) => { // children represents the app component that I wrapped inside the index file     

    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null
    })

    return (
        <WorkoutsContext.Provider>
            { children }
        </WorkoutsContext.Provider>
    )
};