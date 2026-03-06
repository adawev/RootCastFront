import Footer from "./Footer";

function About() {
  return (
    <div className="simple-page">
      <section className="simple-hero">
        <h1>About RootCast</h1>
        <p>RootCast is a weather-first platform focused on clear forecasts, strong UX, and actionable travel context.</p>
      </section>
      <section className="simple-card">
        <h2>What We Focus On</h2>
        <ul>
          <li>Reliable weather lookup for major cities</li>
          <li>Readable details instead of noisy dashboards</li>
          <li>Practical recommendations for daily planning</li>
        </ul>
      </section>
      <Footer />
    </div>
  );
}

export default About;
