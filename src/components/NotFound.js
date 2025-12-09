import {Link} from "react-router";

function NotFound() {
    return (
        <div className="not-found-page">
            <div className="not-found-content">
                <div className="not-found-icon">
                    <i className="fas fa-cloud-showers-heavy"></i>
                </div>
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p>
                    Oops! Looks like you've wandered into uncharted weather territory.
                    The page you're looking for doesn't exist.
                </p>
                <div className="not-found-actions">
                    <Link to="/" className="btn-home">
                        <i className="fas fa-home"></i> Back to Home
                    </Link>
                    <Link to="/check-weather" className="btn-weather">
                        <i className="fas fa-cloud-sun"></i> Check Weather
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
