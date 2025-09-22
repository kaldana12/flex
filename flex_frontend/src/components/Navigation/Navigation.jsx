import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation({ isMobileMenuOpen, closeMenu }) {
  return (
    <ul
      className={`navigation__list ${
        isMobileMenuOpen ? "navigation__list--open" : ""
      }`}
    >
      <li className="navigation__item">
        <Link to="/" className="navigation__link" onClick={closeMenu}>
          Home
        </Link>
      </li>
      <li className="navigation__item">
        <Link to="/profile" className="navigation__link" onClick={closeMenu}>
          Profile
        </Link>
      </li>
    </ul>
  );
}

export default Navigation;
