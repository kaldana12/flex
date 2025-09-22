import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/flexlogowhite.png";
import "./Header.css";
import Navigation from "../Navigation/Navigation";
import { SEARCH_PLACEHOLDER } from "../../config/constants";

function Header({
  onSignUpClick,
  onLoginClick,
  onLogout,
  isLoggedIn,
  searchQuery,
  setSearchQuery,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search submitted:", searchQuery);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`header ${menuOpen ? "header__menu-open" : ""}`}>
      <div className="header__container">
        <Link to="/">
          <img className="header__logo" src={logo} alt="logo" />
        </Link>

        <button
          className="header__menu-button"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          ☰
        </button>
      </div>

      <nav className="header__nav-wrapper">
        <Navigation isMobileMenuOpen={menuOpen} closeMenu={closeMenu} />
      </nav>

      <div className="header__right">
        <form className="header__search-form" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="header__search-input"
            placeholder={SEARCH_PLACEHOLDER}
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit" className="header__search-button">
            Go
          </button>
        </form>

        {!isLoggedIn ? (
          <>
            <button
              onClick={onSignUpClick}
              type="button"
              className="header__signup-btn"
            >
              Sign Up
            </button>
            <button
              onClick={onLoginClick}
              type="button"
              className="header__login-btn"
            >
              Log In
            </button>
          </>
        ) : (
          <button
            onClick={onLogout}
            type="button"
            className="header__login-btn"
          >
            Log Out
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
