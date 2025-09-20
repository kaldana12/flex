import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <div className="navigation">
      <button className="navigation__toggle" onClick={handleToggleMenu}>
        ☰
      </button>

      <ul
        className={`navigation__list ${
          isMobileMenuOpen ? "navigation__list--open" : ""
        }`}
      >
        <li className="navigation__item">
          <Link
            to="/"
            className="navigation__link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
        </li>
        <li className="navigation__item">
          <Link
            to="/profile"
            className="navigation__link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Profile
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
