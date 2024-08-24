import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { WorkoutsContextProvider } from "./context/WorkoutsContext";
import { AiWorkoutsContextProvider } from "./context/AiWorkoutsContext";
import { AuthProvider } from "./context/AuthContext"; // Assuming you have the AuthContext in this path

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <WorkoutsContextProvider>
        <AiWorkoutsContextProvider>
          <App />
        </AiWorkoutsContextProvider>
      </WorkoutsContextProvider>
    </AuthProvider>
  </React.StrictMode>
);
