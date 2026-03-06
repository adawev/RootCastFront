import Footer from "./Footer";

function About() {
  return (
    <div className="simple-page">
      <section className="simple-hero">
        <h1>About RootCast</h1>
        <p>RootCast is a weather-first platform focused on clear forecasts, strong UX, and actionable travel context.</p>
      </section>
      <section className="about-block">
        <h2>What We Focus On</h2>
        <ul>
          <li>Reliable weather lookup for major cities</li>
          <li>Readable details instead of noisy dashboards</li>
          <li>Practical recommendations for daily planning</li>
        </ul>
      </section>
      <section className="about-pillars">
        <article className="pillar">
          <h4>Data Quality</h4>
          <p>We prioritize understandable weather output over raw complexity, while preserving key decision metrics.</p>
        </article>
        <article className="pillar">
          <h4>Design Direction</h4>
          <p>High-contrast cards, meaningful motion, and concise labels built for fast scanning on any device size.</p>
        </article>
        <article className="pillar">
          <h4>Reliability</h4>
          <p>Resilient client-side handling for network, validation, and provider errors with retry-safe user flow.</p>
        </article>
      </section>
      <section className="about-block roadmap">
        <h2>Roadmap</h2>
        <ul>
          <li>Hourly forecast timeline and precipitation probability charts.</li>
          <li>Air quality and UV exposure modules.</li>
          <li>Saved cities with personalized weather alerts.</li>
        </ul>
      </section>
      <Footer />
    </div>
  );
}

export default About;
