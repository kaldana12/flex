import { useState } from "react";
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
    <main className="profile">
      <h1>Profile</h1>

      {!isLoggedIn ? (
        <p>Please log in to view your saved workouts.</p>
      ) : likedWorkouts.length === 0 ? (
        <p>You have not liked any workouts yet.</p>
      ) : (
        <section className="profile__exercises">
          <h2>Saved Workouts</h2>
          <div className="profile__grid">
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
