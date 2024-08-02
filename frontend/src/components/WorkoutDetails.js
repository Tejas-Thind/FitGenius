const workoutDetails = ({ workout }) => {
  return (
    <div className="workout-details">
      <h3>{workout.title}</h3>
      <p>
        <strong>Load: </strong>
        {workout.load}
      </p>
      <p>
        <strong>Sets: </strong>
        {workout.sets}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        <strong>Notes: </strong>
        {workout.notes}
      </p>
    </div>
  );
};

export default workoutDetails;