import {Outlet, Link, NavLink} from "react-router";
import {useState} from "react";
import "./style.css"
import Footer from "./Footer";

function Navbar({footer}) {
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
                <ul className="nav-links">
                    <li>
                        <Link to="/" className="logo" onClick={closeMobileMenu}>
                        </Link>
                    </li>
                    <div className={`nav-center ${mobileMenuOpen ? 'mobile-active' : ''}`}>
                        <li>
                            <NavLink
                                to="/"
                                onClick={closeMobileMenu}
                                className={({isActive}) => isActive ? 'active' : ''}
                                end
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/check-weather"
                                onClick={closeMobileMenu}
                                className={({isActive}) => isActive ? 'active' : ''}
                            >
                                Check Weather
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/about"
                                onClick={closeMobileMenu}
                                className={({isActive}) => isActive ? 'active' : ''}
                            >
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/contacts"
                                onClick={closeMobileMenu}
                                className={({isActive}) => isActive ? 'active' : ''}
                            >
                                Contacts
                            </NavLink>
                        </li>
                    </div>
                    <button className="mobile-menu-toggle" onClick={toggleMobileMenu} aria-label="Toggle navigation menu">
                        <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                    </button>
                </ul>
            </nav>
            <Outlet/>
        </div>
    );
}

export default Navbar;