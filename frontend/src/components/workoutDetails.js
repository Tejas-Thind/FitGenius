

const workoutDetails = ({ workout }) => {
    return (
        <div className="workout-details">
        <h2>{workout.title}</h2>
        <p>{workout.load}</p>
        <p>{workout.sets}</p>
        <p>{workout.reps}</p>
        <p>{workout.notes}</p>
        </div>
    );
}

export default workoutDetails;