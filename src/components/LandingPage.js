import { Link } from "react-router";
import Button from "./ui/Button";
import Footer from "./Footer";

function LandingPage() {
  return (
    <div className="landing-page">
      <section className="hero">
        <div className="weather-visual" aria-hidden="true">
          <div className="sun-core" />
          <div className="cloud cloud-one" />
          <div className="cloud cloud-two" />
          <div className="rain rain-one" />
          <div className="rain rain-two" />
          <div className="rain rain-three" />
        </div>
        <div className="hero-content">
          <p className="kicker">RootCast Weather Platform</p>
          <h1>Animated forecasts with real-world travel context</h1>
          <p>
            Explore current and upcoming weather with a modern interface, clear risk signals, and practical tips in one
            place.
          </p>
          <Link to="/check-weather">
            <Button size="lg">Start Weather Check</Button>
          </Link>
        </div>
      </section>

      <section className="features">
        <h2 className="features-title">Designed For Fast Decisions</h2>
        <div className="feature-list">
          <div className="feature-band">
            <div className="feature-icon icon-weather-pulse" aria-hidden="true">
              <span className="dot" />
              <span className="ring" />
            </div>
            <div>
              <h3>Expanded Data</h3>
              <p>Temperature bands, visibility, wind direction, cloudiness, sunrise and sunset details.</p>
            </div>
          </div>
          <div className="feature-band">
            <div className="feature-icon icon-bolt" aria-hidden="true">
              <span className="bolt-shape" />
            </div>
            <div>
              <h3>Fast Interactions</h3>
              <p>Smart city search, smooth transitions, responsive layout and clean state handling.</p>
            </div>
          </div>
          <div className="feature-band">
            <div className="feature-icon icon-shield" aria-hidden="true">
              <span className="shield-shape" />
            </div>
            <div>
              <h3>Resilient UX</h3>
              <p>Friendly error messages, retry actions, and preserved previous results on failures.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="weather-preview">
        <div className="preview-head">
          <p className="kicker">UI Preview</p>
          <h2>How Weather Information Is Displayed</h2>
          <p>
            RootCast presents a compact summary first, then key metrics, then actionable tips so users can decide fast.
          </p>
        </div>
        <div className="preview-layout">
          <article className="preview-now">
            <p className="kicker">Current Conditions</p>
            <h3>Tokyo</h3>
            <p className="preview-date">2026-03-06</p>
            <div className="preview-temp">
              <strong>21°</strong>
              <span>L 18° / H 24°</span>
            </div>
            <p className="preview-desc">Clouds • broken clouds</p>
          </article>

          <article className="preview-metrics">
            <p className="kicker">Detailed Metrics</p>
            <div className="preview-metric-grid">
              <div><span>Feels Like</span><b>22°C</b></div>
              <div><span>Humidity</span><b>62%</b></div>
              <div><span>Wind</span><b>4.2 m/s NE</b></div>
              <div><span>Pressure</span><b>1014 hPa</b></div>
              <div><span>Cloudiness</span><b>76%</b></div>
              <div><span>Visibility</span><b>8 km</b></div>
              <div><span>Rain Chance</span><b>35%</b></div>
              <div><span>AQI / UV</span><b>2 / 4.8</b></div>
            </div>
          </article>

          <article className="preview-tips">
            <p className="kicker">Travel Tips</p>
            <ul>
              <li>Light jacket recommended for evening hours.</li>
              <li>Moderate humidity: carry water for long walks.</li>
              <li>Best outdoor window: after 16:00 before sunset.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="home-insights">
        <article className="insight-band">
          <div className="insight-icon icon-bars" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <h4>What You Get</h4>
          <p>Current conditions, min/max temperature, wind direction, visibility, cloudiness, and sunrise/sunset.</p>
        </article>
        <article className="insight-band">
          <div className="insight-icon icon-clock" aria-hidden="true">
            <span className="clock-hand one" />
            <span className="clock-hand two" />
          </div>
          <h4>Forecast Window</h4>
          <p>Reliable now + near-term forecast view optimized for quick planning and travel decisions.</p>
        </article>
        <article className="insight-band">
          <div className="insight-icon icon-route" aria-hidden="true">
            <span className="route-path" />
            <span className="route-dot" />
          </div>
          <h4>Actionable Guidance</h4>
          <p>Weather-aware comfort and movement tips generated from live atmospheric conditions.</p>
        </article>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <ul>
          <li>Search a city using smart suggestions.</li>
          <li>Select a date to compare expected conditions.</li>
          <li>Review detailed metrics and travel tips instantly.</li>
        </ul>
      </section>
      <Footer />
    </div>
  );
}

export default LandingPage;
