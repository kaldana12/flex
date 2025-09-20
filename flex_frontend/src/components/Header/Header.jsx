import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/flexlogowhite.png";
import "./Header.css";
import Navigation from "../Navigation/Navigation";

function Header({
  onSignUpClick,
  onLoginClick,
  onLogout,
  isLoggedIn,
  searchQuery,
  setSearchQuery,
}) {
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search submitted:", searchQuery);
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/">
          <img className="header__logo" src={logo} alt="logo" />
        </Link>
      </div>

      <Navigation />

      <div className="header__right">
        <form className="header__search-form" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="header__search-input"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit" className="header__search-button">
            🔍
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
