import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import {
  mockLogin,
  checkToken,
  saveWorkout,
  removeSavedWorkout,
  getSavedWorkouts,
} from "../../utils/mockApi";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import "./App.css";

function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [likedWorkouts, setLikedWorkouts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loginError, setLoginError] = useState("");

  const loadSavedWorkouts = async () => {
    try {
      const saved = await getSavedWorkouts();
      setLikedWorkouts(saved);
    } catch (err) {
      console.error("Failed to load saved workouts:", err);
    }
  };

  useEffect(() => {
    checkToken()
      .then(({ user }) => {
        console.log("Token found, user:", user);
        setIsLoggedIn(true);
        loadSavedWorkouts();
      })
      .catch((err) => {
        console.log("No valid token:", err.message);
        setIsLoggedIn(false);
      });
  }, []);

  const switchToLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  const switchToRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  // Modal handlers
  const handleRegisterOpen = () => setIsRegisterOpen(true);
  const handleRegisterClose = () => setIsRegisterOpen(false);
  const handleLoginOpen = () => setIsLoginOpen(true);

  //  Logout handler
  const handleLogout = () => {
    setIsLoggedIn(false);
    setLikedWorkouts([]);
  };

  // When login or register is successful
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    handleLoginClose();
    handleRegisterClose();
    loadSavedWorkouts();
  };

  //  Like/unlike workouts
  const handleLikeWorkout = (workout) => {
    console.log("Liked/Unliked workout:", workout);
    const alreadyLiked = likedWorkouts.some((w) => w.id === workout.id);

    if (alreadyLiked) {
      removeSavedWorkout(workout.id).then(() => {
        setLikedWorkouts((prev) => prev.filter((w) => w.id !== workout.id));
      });
    } else {
      saveWorkout(workout).then(() => {
        setLikedWorkouts((prev) => [...prev, workout]);
      });
    }
  };

  const handleLoginError = (errorMessage) => {
    setLoginError(errorMessage);
  };

  const handleLoginClose = () => {
    setIsLoginOpen(false);
    setLoginError("");
  };

  return (
    <div className="app">
      <Header
        onSignUpClick={handleRegisterOpen}
        onLoginClick={handleLoginOpen}
        onLogout={handleLogout}
        isLoggedIn={isLoggedIn}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="app__main">
        <div className="app__container">
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  isLoggedIn={isLoggedIn}
                  onLikeWorkout={handleLikeWorkout}
                  likedWorkouts={likedWorkouts}
                  setLikedWorkouts={setLikedWorkouts}
                  searchQuery={searchQuery}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  likedWorkouts={likedWorkouts}
                  isLoggedIn={isLoggedIn}
                  onLikeWorkout={handleLikeWorkout}
                />
              }
            />
          </Routes>

          <RegisterModal
            isOpen={isRegisterOpen}
            onClose={handleRegisterClose}
            onSwitchToLogin={switchToLogin}
            onSubmit={(formData) => {
              console.log("Registering:", formData);
              handleLoginSuccess();
            }}
          />

          <LoginModal
            isOpen={isLoginOpen}
            onClose={handleLoginClose}
            loginError={loginError}
            onSwitchToRegister={switchToRegister}
            onSubmit={async (formData) => {
              try {
                setLoginError("");
                console.log("Attempting login:", formData);
                const response = await mockLogin(
                  formData.username,
                  formData.password
                );
                console.log("Login successful:", response);
                handleLoginSuccess();
              } catch (error) {
                console.error("Login failed:", error.message);
                handleLoginError(
                  "Invalid username or password. Please try again."
                );
              }
            }}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
