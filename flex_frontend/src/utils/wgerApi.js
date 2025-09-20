const BASE_URL = "https://wger.de/api/v2";

// Get a list of exercises
export async function getExerciseInfo(limit = 20) {
  const res = await fetch(
    `${BASE_URL}/exerciseinfo/?limit=${limit}&language=2`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch exercise info: ${res.status}`);
  }

  const data = await res.json();

  const exercisesWithEnglish = data.results.map((exercise) => {
    const englishTranslation = (exercise.translations || []).find(
      (t) => t.language === 2
    );

    return {
      id: exercise.id,
      name: englishTranslation?.name ?? null,
      description: englishTranslation?.description ?? null,
      category: exercise.category?.name ?? "Unknown",
      muscles: exercise.muscles?.map((m) => m.name) ?? [],
      equipment: exercise.equipment?.map((e) => e.name) ?? [],
      aliases: englishTranslation?.aliases ?? [],
      images: exercise.images ?? [],
    };
  });

  const filteredExercises = exercisesWithEnglish.filter(
    (ex) => ex.name && ex.name.trim() !== ""
  );

  return filteredExercises;
}

// Get exercise images
export function getExerciseImage(exerciseId) {
  return fetch(`${BASE_URL}/exerciseimage/?exercise=${exerciseId}`).then(
    (res) => {
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      return res.json();
    }
  );
}

// Get exercise aliases
export function getExerciseAliases(exerciseId) {
  return fetch(`${BASE_URL}/exercisealias/?exercise=${exerciseId}`).then(
    (res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch aliases");
      }
      return res.json();
    }
  );
}
