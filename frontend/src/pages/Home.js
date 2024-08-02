import { useState, useEffect } from "react";

const Home = () => {

  const [workouts, setWorkouts] = useState([]);
  useEffect(() => {
    document.title = "FitGenius | Home";
    const fetchWorkouts = async () => {
      const response = await fetch("http://localhost:4000/api/workouts");
      const data = await response.json();
      
      if (response.ok) {
        setWorkouts(data);
      }
      else {
        console.log('There was an error');
      }
    };
    fetchWorkouts();
  }, []);

  return (
    <div className="workouts">
      
    </div>
  );
};

export default Home;
