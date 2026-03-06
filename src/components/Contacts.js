import Footer from "./Footer";

function Contacts() {
  return (
    <div className="simple-page">
      <div className="page-bg page-bg-clouds" aria-hidden="true">
        <span className="page-cloud page-cloud-two" />
        <span className="page-drop page-drop-one" />
        <span className="page-sun page-sun-one" />
      </div>
      <section className="simple-hero">
        <h1>Contacts</h1>
        <p>Connect with me on my social profiles.</p>
      </section>

      <section className="contact-layout">
        <aside className="contact-side">
          <h2>Find Me Online</h2>
          <p>These social links are synced from diyorjon.com.</p>
          <ul>
            <li>GitHub for code and projects</li>
            <li>LinkedIn for professional updates</li>
            <li>LeetCode for problem-solving activity</li>
          </ul>
        </aside>
        <div className="contact-main social-links-card">
          <a href="https://github.com/adawev" target="_blank" rel="noreferrer">
            <span className="social-link-badge">GH</span>
            <span className="social-link-copy">
              <span className="social-link-title">GitHub</span>
              <span className="social-link-handle">@adawev</span>
            </span>
          </a>
          <a href="https://linkedin.com/in/adawev" target="_blank" rel="noreferrer">
            <span className="social-link-badge">IN</span>
            <span className="social-link-copy">
              <span className="social-link-title">LinkedIn</span>
              <span className="social-link-handle">/in/adawev</span>
            </span>
          </a>
          <a href="https://leetcode.com/adawev" target="_blank" rel="noreferrer">
            <span className="social-link-badge">LC</span>
            <span className="social-link-copy">
              <span className="social-link-title">LeetCode</span>
              <span className="social-link-handle">leetcode.com/adawev</span>
            </span>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Contacts;
