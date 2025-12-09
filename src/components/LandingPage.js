import {Link} from "react-router";
import Footer from "./Footer";

function LandingPage() {
    return <div>
        <section className="hero">
            <div className="hero-content">
                <h1>Real time, real weather</h1>
                <p>Instant and accurate forecasts at your fingertips. Get real-time weather updates from anywhere in the
                    world.</p>
                <Link to="/check-weather">
                    <button className="cloud-button">
                        <span className="cloud-icon">☁️</span>
                        Check Weather
                    </button>
                </Link>

            </div>
        </section>

        <section className="info-section">
            <div className="info-content">
                <div className="info-text">
                    <h2>Real-Time Weather Data</h2>
                    <p>Get instant access to accurate weather information for any location around the globe. Our
                        advanced forecasting system provides detailed data including temperature, humidity, wind speed,
                        and more.</p>
                    <p>Whether you're planning your day or preparing for a trip, we've got you covered with reliable
                        weather insights.</p>
                    <ul className="info-features">
                        <li>Accurate 7-day forecasts</li>
                        <li>Hourly weather updates</li>
                        <li>Severe weather alerts</li>
                        <li>Global location coverage</li>
                    </ul>
                </div>

                <div className="info-card">
                    <div className="card-intro">
                        <h3>Live Weather Data</h3>
                        <p>See real-time weather conditions for any location</p>
                    </div>

                    <div className="location-header">
                        <h3 className="location-name">New York, USA</h3>
                        <span className="location-icon">📍</span>
                    </div>

                    <div className="weather-main">
                        <div className="temperature">22°C</div>
                        <div className="condition">Partly Cloudy</div>
                    </div>

                    <div className="weather-details">
                        <div className="detail-item">
                            <div className="detail-label">Humidity</div>
                            <div className="detail-value">68%</div>
                        </div>
                        <div className="detail-item">
                            <div className="detail-label">Wind Speed</div>
                            <div className="detail-value">15 km/h</div>
                        </div>
                        <div className="detail-item">
                            <div className="detail-label">Pressure</div>
                            <div className="detail-value">1013 hPa</div>
                        </div>
                        <div className="detail-item">
                            <div className="detail-label">Visibility</div>
                            <div className="detail-value">10 km</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="features">
            <h2 className="features-title">Why Choose Us</h2>
            <div className="features-grid">
                <div className="feature-item">
                    <div className="feature-icon">🌍</div>
                    <div className="feature-title">Global Coverage</div>
                    <div className="feature-text">Access accurate weather data from thousands of locations around the
                        world
                    </div>
                </div>
                <div className="feature-item">
                    <div className="feature-icon">⏱️</div>
                    <div className="feature-title">Real-time Updates</div>
                    <div className="feature-text">Get the latest forecasts updated every minute with precise accuracy</div>
                </div>
                <div className="feature-item">
                    <div className="feature-icon">🎨</div>
                    <div className="feature-title">Simple & Clean Design</div>
                    <div className="feature-text">Beautiful minimalist interface that's intuitive and easy to navigate</div>
                </div>
            </div>
        </section>
        <Footer/>
    </div>
}

export default LandingPage;