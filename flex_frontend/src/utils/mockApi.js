const MOCK_USER = {
  id: 1,
  email: "test@example.com",
  name: "Test User",
};

// Simulate login
export const mockLogin = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password) {
        const fakeToken = "fake-jwt-token-12345";
        localStorage.setItem("token", fakeToken);
        localStorage.setItem("user", JSON.stringify(MOCK_USER));
        resolve({
          token: fakeToken,
          user: MOCK_USER,
        });
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 1000);
  });
};

// Check if user is logged in
export const checkToken = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const token = localStorage.getItem("token");
      if (token) {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        resolve({ user });
      } else {
        reject(new Error("No valid token"));
      }
    }, 500);
  });
};

// Save workout to favorites
export const saveWorkout = (workout) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const savedWorkouts = JSON.parse(
        localStorage.getItem("savedWorkouts") || "[]"
      );
      const updatedWorkouts = [
        ...savedWorkouts,
        { ...workout, savedAt: new Date().toISOString() },
      ];
      localStorage.setItem("savedWorkouts", JSON.stringify(updatedWorkouts));
      resolve({ success: true });
    }, 500);
  });
};

// Get saved workouts
export const getSavedWorkouts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const savedWorkouts = JSON.parse(
        localStorage.getItem("savedWorkouts") || "[]"
      );
      resolve(savedWorkouts);
    }, 500);
  });
};

// Remove saved workout
export const removeSavedWorkout = (workoutId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const savedWorkouts = JSON.parse(
        localStorage.getItem("savedWorkouts") || "[]"
      );
      const updatedWorkouts = savedWorkouts.filter(
        (workout) => workout.id !== workoutId
      );
      localStorage.setItem("savedWorkouts", JSON.stringify(updatedWorkouts));
      resolve({ success: true });
    }, 500);
  });
};

// Logout
export const mockLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return Promise.resolve({ success: true });
};


export const mockRegister = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password) {
        const fakeToken = "fake-jwt-token-67890";
        const newUser = {
          id: Date.now(),
          email,
          name: "New User",
        };
        localStorage.setItem("token", fakeToken);
        localStorage.setItem("user", JSON.stringify(newUser));
        resolve({
          token: fakeToken,
          user: newUser,
        });
      } else {
        reject(new Error("Missing email or password"));
      }
    }, 1000);
  });
};