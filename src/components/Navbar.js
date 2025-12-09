import {Outlet, Link} from "react-router";
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
                        <li><Link to="/" onClick={closeMobileMenu}>Home</Link></li>
                        <li><Link to="/check-weather" onClick={closeMobileMenu}>Check Weather</Link></li>
                        <li><Link to="/about" onClick={closeMobileMenu}>About</Link></li>
                        <li><Link to="/contacts" onClick={closeMobileMenu}>Contacts</Link></li>
                    </div>
                    <button className="mobile-menu-toggle" onClick={toggleMobileMenu} aria-label="Toggle navigation menu">
                        <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                    </button>
                </ul>
            </nav>
            <Outlet/>
            {footer? null:<Footer/> }
        </div>
    );
}

export default Navbar;