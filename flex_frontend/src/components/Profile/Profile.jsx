import React, { useState } from "react";
import WorkoutCard from "../WorkoutCard/WorkoutCard";
import WorkoutModal from "../WorkoutModal/WorkoutModal";
import "./Profile.css";

function Profile({ likedWorkouts, isLoggedIn, onLikeWorkout }) {
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const openModal = (workout) => {
    setSelectedWorkout(workout);
  };

  const closeModal = () => {
    setSelectedWorkout(null);
  };

  return (
    <main className="main">
      <h1>Profile</h1>

      {!isLoggedIn ? (
        <p>Please log in to view your saved workouts.</p>
      ) : likedWorkouts.length === 0 ? (
        <p>You haven't liked any workouts yet.</p>
      ) : (
        <section className="exercises">
          <h2>Saved Workouts</h2>
          <div className="exercises__grid">
            {likedWorkouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
                onClick={openModal}
                isLiked={true}
                onLikeWorkout={onLikeWorkout}
              />
            ))}
          </div>
        </section>
      )}

      {selectedWorkout && (
        <WorkoutModal workout={selectedWorkout} onClose={closeModal} />
      )}
    </main>
  );
}

export default Profile;
