import {Link} from "react-router";

function Footer() {
    return (
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo"></div>
          <p className="footer-description">Weather insights for faster day-to-day and travel decisions.</p>
          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/check-weather">Weather</Link>
            <Link to="/about">About</Link>
            <Link to="/contacts">Contact</Link>
          </div>
          <div className="footer-divider"></div>
          <p className="footer-text">© 2026 RootCast. All rights reserved.</p>
        </div>
      </footer>
    );
}

export default Footer;
