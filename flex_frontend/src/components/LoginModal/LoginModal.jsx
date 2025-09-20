import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

function LoginModal({ isOpen, onClose, onSubmit, loginError }) {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Login"
      buttonText="Login"
    >
      {loginError && <div className="modal__error">{loginError}</div>}
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
            !((values.username || "").trim() && (values.password || "").trim())
          }
        >
          Login
        </button>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
