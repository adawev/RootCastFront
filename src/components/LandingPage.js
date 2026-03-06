import { Link } from "react-router";
import Button from "./ui/Button";
import Footer from "./Footer";

const rainDrops = Array.from({ length: 72 }, (_, index) => {
  const seed = index + 1;
  return {
    left: ((seed * 37) % 100) + Math.random() * 0.7,
    delay: (seed % 13) * -0.17,
    duration: 1.8 + ((seed * 19) % 7) * 0.2,
    height: 9 + ((seed * 11) % 13),
    opacity: 0.26 + ((seed * 5) % 7) * 0.08,
    width: 1 + ((seed * 3) % 2),
    drift: ((seed * 7) % 5) - 2
  };
});

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="page-bg page-bg-clouds" aria-hidden="true">
        <span className="page-cloud page-cloud-one" />
        <span className="page-cloud page-cloud-two" />
        <span className="page-drop page-drop-one" />
        <span className="page-sun page-sun-one" />
        <div className="page-rain-overlay">
          {rainDrops.map((drop, index) => (
            <span
              key={`rain-${index}`}
              className="page-rain-line"
              style={{
                left: `${drop.left}%`,
                animationDelay: `${drop.delay}s`,
                animationDuration: `${drop.duration}s`,
                height: `${drop.height}%`,
                opacity: drop.opacity,
                width: `${drop.width}px`,
                "--rain-drift": `${drop.drift}px`
              }}
            />
          ))}
        </div>
      </div>
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
        <div className="preview-cloud-layer" aria-hidden="true">
          <span className="preview-cloud preview-cloud-a" />
          <span className="preview-cloud preview-cloud-b" />
        </div>
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
            <p className="preview-desc">
              <span className="mini-icon mini-cloud" aria-hidden="true" /> Clouds • broken clouds
            </p>
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
              <div>
                <span>
                  <span className="section-icon section-icon-air preview-inline-icon" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </span>
                  AQI
                </span>
                <b>2 / 5</b>
              </div>
              <div>
                <span>
                  <span className="section-icon section-icon-uv preview-inline-icon" aria-hidden="true" />
                  UV Index
                </span>
                <b>4.8</b>
              </div>
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
        <div className="preview-hourly">
          <article className="timeline-item">
            <div className="time-row">
              <p className="time">09:00</p>
              <span className="mini-icon mini-sun" aria-hidden="true" />
            </div>
            <h4>20°C</h4>
            <p>Clear</p>
            <small>Rain: 10%</small>
            <small>Wind: 3.8 m/s</small>
          </article>
          <article className="timeline-item">
            <div className="time-row">
              <p className="time">12:00</p>
              <span className="mini-icon mini-cloud" aria-hidden="true" />
            </div>
            <h4>22°C</h4>
            <p>Clouds</p>
            <small>Rain: 24%</small>
            <small>Wind: 4.2 m/s</small>
          </article>
          <article className="timeline-item">
            <div className="time-row">
              <p className="time">15:00</p>
              <span className="mini-icon mini-rain" aria-hidden="true" />
            </div>
            <h4>21°C</h4>
            <p>Rain</p>
            <small>Rain: 58%</small>
            <small>Wind: 5.1 m/s</small>
          </article>
          <article className="timeline-item">
            <div className="time-row">
              <p className="time">18:00</p>
              <span className="mini-icon mini-snow" aria-hidden="true" />
            </div>
            <h4>17°C</h4>
            <p>Snow</p>
            <small>Rain: 42%</small>
            <small>Wind: 3.4 m/s</small>
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
