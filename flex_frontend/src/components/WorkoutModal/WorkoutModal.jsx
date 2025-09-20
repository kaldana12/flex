import React, { useEffect, useState } from "react";
import { getExerciseImage, getExerciseAliases } from "../../utils/wgerApi";
import "./WorkoutModal.css";

function WorkoutModal({ workout, onClose }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [aliases, setAliases] = useState([]);

  useEffect(() => {
    if (workout) {
      getExerciseImage(workout.id)
        .then((data) => {
          if (data.results.length > 0) {
            setImageUrl(data.results[0].image);
          }
        })
        .catch((err) => console.error("Image fetch failed:", err));

      getExerciseAliases(workout.id)
        .then((data) => {
          const names = data.results.map((alias) => alias.name).filter(Boolean);
          setAliases(names);
        })
        .catch((err) => console.error("Alias fetch failed:", err));
    }
  }, [workout]);

  if (!workout) return null;

  return (
    <div className="modal-overlay__workout" onClick={onClose}>
      <div className="modal__workout" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close-workout" onClick={onClose}>
          &times;
        </button>
        <h2>{workout.name}</h2>

        {workout.category && (
          <p>
            <strong>Category:</strong> {workout.category}
          </p>
        )}

        {workout.description && workout.description.trim() !== "" && (
          <p dangerouslySetInnerHTML={{ __html: workout.description }} />
        )}

        {aliases.length > 0 && (
          <p>
            <strong>Also known as:</strong> {aliases.join(", ")}
          </p>
        )}

        {workout.muscles?.length > 0 && (
          <p>
            <strong>Primary Muscles:</strong> {workout.muscles.join(", ")}
          </p>
        )}

        {workout.equipment?.length > 0 && (
          <p>
            <strong>Equipment:</strong> {workout.equipment.join(", ")}
          </p>
        )}

        {workout.comments?.length > 0 && (
          <div>
            <strong>Tips:</strong>
            <ul>
              {workout.comments.map((comment, index) => (
                <li key={index}>{comment}</li>
              ))}
            </ul>
          </div>
        )}

        {imageUrl && (
          <img src={imageUrl} alt={workout.name} className="modal__image" />
        )}
      </div>
    </div>
  );
}

export default WorkoutModal;
