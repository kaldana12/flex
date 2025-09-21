import { useState } from "react";
import { mockRegister } from "../../utils/mockApi";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import "./RegisterModal.css";
import { REGISTRATION_ERROR_MESSAGE } from "../../config/constants";

function RegisterModal({ isOpen, onClose, onSwitchToLogin }) {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [setRegisterError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegisterError("");

    try {
      await mockRegister(values.email, values.password);
      onClose();
    } catch (err) {
      console.error("Registration error:", err);
      setRegisterError(REGISTRATION_ERROR_MESSAGE);
    }
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Sign up"
      buttonText="Register"
    >
      <label>
        <input
          className="modal__input"
          type="username"
          name="username"
          placeholder="Username"
          value={values.username}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        <input
          className="modal__input"
          type="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        <input
          className="modal__input"
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
      <div className="modal__button-wrapper">
        <button
          type="submit"
          className="modal__submit"
          disabled={
            !((values.email || "").trim() && (values.password || "").trim())
          }
        >
          Sign Up
        </button>
        <button
          type="button"
          className="modal__link-button"
          onClick={onSwitchToLogin}
        >
          or Log In
        </button>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
