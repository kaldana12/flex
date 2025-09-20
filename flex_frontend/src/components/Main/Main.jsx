import { useState, useEffect } from "react";
import { getExerciseInfo } from "../../utils/wgerApi";
import {
  getSavedWorkouts,
  saveWorkout,
  removeSavedWorkout,
} from "../../utils/mockApi";
import WorkoutCard from "../WorkoutCard/WorkoutCard";
import WorkoutModal from "../WorkoutModal/WorkoutModal";
import Preloader from "../Preloader/Preloader";
import "./Main.css";

function Main({ isLoggedIn, onLikeWorkout, likedWorkouts, searchQuery }) {
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [error, setError] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    getExerciseInfo(20)
      .then((data) => {
        setExercises(data);
        setError("");
      })
      .catch((err) => {
        console.error("Failed to fetch exercises:", err);
        setError(
          "Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later."
        );
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
      <h1 className="card__name">Welcome to Flex!</h1>
      <section className="exercises">
        <h2>Available Exercises</h2>
        <div className="exercises__grid">
          {isLoading ? (
            <Preloader />
          ) : error ? (
            <p className="error__message">{error}</p>
          ) : exercises.length === 0 ? (
            <p className="no__results">Nothing found</p>
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
                  className="show-more__btn"
                  onClick={() => setVisibleCount((prev) => prev + 3)}
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
