import {Outlet, Link, NavLink} from "react-router";
import {useState} from "react";
import "./style.css"

function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
      <div>
        <nav className="navbar">
          <div className="nav-shell">
            <Link to="/" className="logo" onClick={closeMobileMenu} />
            <div className={`nav-center ${mobileMenuOpen ? "mobile-active" : ""}`}>
              <NavLink to="/" onClick={closeMobileMenu} className={({ isActive }) => (isActive ? "active" : "")} end>
                Home
              </NavLink>
              <NavLink to="/check-weather" onClick={closeMobileMenu} className={({ isActive }) => (isActive ? "active" : "")}>
                Weather
              </NavLink>
              <NavLink to="/about" onClick={closeMobileMenu} className={({ isActive }) => (isActive ? "active" : "")}>
                About
              </NavLink>
              <NavLink to="/contacts" onClick={closeMobileMenu} className={({ isActive }) => (isActive ? "active" : "")}>
                Contact
              </NavLink>
            </div>
            <button className="mobile-menu-toggle" onClick={toggleMobileMenu} aria-label="Toggle navigation menu">
              <i className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"}`}></i>
            </button>
          </div>
        </nav>
        <Outlet />
      </div>
    );
}

export default Navbar;
