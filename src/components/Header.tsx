import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="header__container">
        <NavLink to="/" className="header__logo" onClick={closeMenu}>
          Bokhyllan
        </NavLink>
        <button
          className={`header__toggle ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={`header__nav ${menuOpen ? "open" : ""}`}>
          <NavLink to="/" onClick={closeMenu} className="header__link">
            Hem
          </NavLink>
          <NavLink
            to="/my-reviews"
            onClick={closeMenu}
            className="header__link"
          >
            Mina recensioner
          </NavLink>
          <NavLink to="/login" onClick={closeMenu} className="header__link">
            Logga in
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
