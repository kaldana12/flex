import { useState, useEffect } from "react";
import { getExerciseInfo } from "../../utils/wgerApi";
import WorkoutCard from "../WorkoutCard/WorkoutCard";
import WorkoutModal from "../WorkoutModal/WorkoutModal";
import Preloader from "../Preloader/Preloader";
import "./Main.css";
import {
  MAX_VISIBLE_EXERCISES,
  VISIBLE_INCREMENT,
  ERROR_FETCHING_EXERCISES,
} from "../../config/constants";

function Main({ onLikeWorkout, likedWorkouts, searchQuery }) {
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [error, setError] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    getExerciseInfo(MAX_VISIBLE_EXERCISES)
      .then((data) => {
        setExercises(data);
        setError("");
      })
      .catch((err) => {
        console.error("Failed to fetch exercises:", err);
        setError(ERROR_FETCHING_EXERCISES);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const openModal = (workout) => {
    setSelectedWorkout(workout);
  };

  const closeModal = () => {
    setSelectedWorkout(null);
  };

  const filteredExercises = exercises.filter((exercise) => {
    const query = searchQuery.toLowerCase();
    return (
      exercise.name.toLowerCase().includes(query) ||
      exercise.category.toLowerCase().includes(query)
    );
  });

  return (
    <main className="main">
      <h1 className="main__name">Welcome to Flex!</h1>
      <section className="main__exercises">
        <h2>Available Exercises</h2>
        <div className="main__grid">
          {isLoading ? (
            <Preloader />
          ) : error ? (
            <p className="main__error-message">{error}</p>
          ) : exercises.length === 0 ? (
            <p className="main__no-results">Nothing found</p>
          ) : (
            <>
              {filteredExercises.slice(0, visibleCount).map((exercise) => (
                <WorkoutCard
                  key={exercise.id}
                  workout={exercise}
                  onClick={openModal}
                  isLiked={likedWorkouts.some((w) => w.id === exercise.id)}
                  onLikeWorkout={onLikeWorkout}
                />
              ))}
              {visibleCount < filteredExercises.length && (
                <button
                  className="main__showmore-btn"
                  onClick={() =>
                    setVisibleCount((prev) => prev + VISIBLE_INCREMENT)
                  }
                >
                  Show more
                </button>
              )}
            </>
          )}
        </div>
      </section>

      {selectedWorkout && (
        <WorkoutModal workout={selectedWorkout} onClose={closeModal} />
      )}
    </main>
  );
}

export default Main;
