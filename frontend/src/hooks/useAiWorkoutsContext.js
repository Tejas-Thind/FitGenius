import { AiWorkoutsContext } from "../context/AiWorkoutsContext";
import { useContext } from "react";

export const useAiWorkoutsContext = () => {
  const context = useContext(AiWorkoutsContext);

  if (!context) {
    throw Error(
      "useAiWorkoutsContext must be used inside an AiWorkoutsContextProvider"
    );
  }

  return context;
};
