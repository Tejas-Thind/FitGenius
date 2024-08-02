import { useState, useEffect } from "react";

const Home = () => {
  const [workouts, setWorkouts] = useState([]);
  useEffect(() => {
    document.title = "FitGenius | Home";
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts");
      const data = await response.json();

      if (response.ok) {
        setWorkouts(data);
      } else {
        console.log("There was an error");
      }
    };
    fetchWorkouts();
  }, []);

  return (
    <div className="home">
      <div className="workouts">
        {workouts.map((workout) => {
          <p key={workout._id}>{workout.title}</p>;
          //<workoutDetails workout={workout} key={workout._id} />;
        })}
      </div>
    </div>
  );
};

export default Home;
