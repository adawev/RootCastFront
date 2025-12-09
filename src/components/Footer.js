import {Link} from "react-router";

function Footer() {
    return <div>
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo"></div>
                <p className="footer-description">
                    Your reliable source for accurate weather forecasts worldwide. Stay informed, stay prepared.
                </p>
                <div className="footer-links">
                    <Link to="/">Home</Link>
                    <Link to="/check-weather">Check Weather</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contacts">Contacts</Link>
                </div>
                <div className="footer-divider"></div>
                <p className="footer-text">© 2025 RootCast. All rights reserved.</p>
            </div>
        </footer>
    </div>
}

export default Footer;