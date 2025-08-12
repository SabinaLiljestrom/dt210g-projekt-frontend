import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import "./Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { token, username, logout } = useAuth(); // <-- token, username, logout

  const toggleMenu = () => setMenuOpen((v) => !v);
  const closeMenu = () => setMenuOpen(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `header__link${isActive ? " active" : ""}`;

  const handleLogout = () => {
    logout();
    closeMenu();
  };

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
          <NavLink to="/" onClick={closeMenu} className={linkClass}>
            Hem
          </NavLink>

          {token ? (
            <>
              <NavLink
                to="/my-reviews"
                onClick={closeMenu}
                className={linkClass}
              >
                Mina recensioner
              </NavLink>
              <button
                onClick={handleLogout}
                className="header__link"
                style={{ background: "none", border: 0 }}
              >
                Logga ut {username ? `(${username})` : ""}
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" onClick={closeMenu} className={linkClass}>
                Logga in
              </NavLink>
              <NavLink to="/register" onClick={closeMenu} className={linkClass}>
                Registrera
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
