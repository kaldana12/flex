import "./WorkoutCard.css";
import likeFilled from "../../assets/likedbutton.svg"; // Your liked heart image
import likeOutline from "../../assets/likebutton.svg"; // Your unliked heart image

function WorkoutCard({ workout, onClick, isLiked, onLikeWorkout }) {
  return (
    <div className="Workout__block">
      <div className="workout__card" onClick={() => onClick(workout)}>
        <h3>{workout.name}</h3>
        <p>
          <strong>Category:</strong> {workout.category}
        </p>

        {/* Like button */}
        <button
          className="like__button"
          onClick={(e) => {
            e.stopPropagation();
            onLikeWorkout(workout);
          }}
          aria-label={isLiked ? "Unlike" : "Like"}
        >
          <img
            src={isLiked ? likeFilled : likeOutline}
            alt={isLiked ? "Liked" : "Not liked"}
            className="like__icon"
          />
        </button>
      </div>
    </div>
  );
}

export default WorkoutCard;
