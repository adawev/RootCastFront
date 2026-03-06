import { Link } from "react-router";
import Button from "./ui/Button";
import Footer from "./Footer";

function LandingPage() {
  return (
    <div className="landing-page">
      <section className="hero">
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
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">🌤️</div>
            <h3>Expanded Data</h3>
            <p>Temperature bands, visibility, wind direction, cloudiness, sunrise and sunset details.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">⚡</div>
            <h3>Fast Interactions</h3>
            <p>Smart city search, smooth transitions, responsive layout and clean state handling.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🛡️</div>
            <h3>Resilient UX</h3>
            <p>Friendly error messages, retry actions, and preserved previous results on failures.</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default LandingPage;
