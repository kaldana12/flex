import WorkoutCard from "../WorkoutCard/WorkoutCard";

function WorkoutCardsList({
  workouts = [],
  isLoading,
  hasSearched,
  searchTerm,
  onWorkoutClick,
}) {
  if (isLoading) {
    return (
      <div className="workout-cards__loading">
        <p>Loading workouts...</p>
      </div>
    );
  }

  if (hasSearched && workouts.length === 0) {
    return (
      <div className="workout-cards__not-found">
        <p>No workouts found for "{searchTerm}"</p>
        <p>Try searching for different muscles or exercise names.</p>
      </div>
    );
  }

  if (!hasSearched && workouts.length === 0) {
    return (
      <div className="workout-cards__empty">
        <p>Search for workouts to get started!</p>
      </div>
    );
  }

  return (
    <section className="workout-cards">
      <div className="workout-cards__header">
        <h2 className="workout-cards__title">
          {hasSearched ? `Results for "${searchTerm}"` : "Workouts"}
        </h2>
        <p className="workout-cards__count">
          {workouts.length} workout{workouts.length !== 1 ? "s" : ""} found
        </p>
      </div>

      <div className="workout-cards__list">
        {workouts.map((workout) => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
            onClick={onWorkoutClick}
          />
        ))}
      </div>
    </section>
  );
}

export default WorkoutCardsList;
