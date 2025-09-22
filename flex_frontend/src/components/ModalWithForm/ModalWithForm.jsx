import { useEffect } from "react";
import close from "../../assets/close.png";
import "./ModalWithForm.css";
import { MODAL_CLOSE_KEY } from "../../config/constants";

function ModalWithForm({ children, title, isOpen, onSubmit, onClose }) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === MODAL_CLOSE_KEY) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Close on overlay click
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal modal_opened" onClick={handleOverlayClick}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal__title">{title}</h2>
        <button type="button" onClick={onClose} className="modal__close">
          <img src={close} alt="close button" className="modal__close-button" />
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
