import NoiseBackgroundDemoSecond from './components/ui/noise-background-demo-2'

function App() {
  return (
    <main className="app-shell">
      <section className="demo-panel">
        <div className="hero-copy">
          <p className="eyebrow">Selected work</p>
          <h1>Designing calm, lasting digital experiences.</h1>
          <p>
            Here are two recent projects shaped around clarity, motion, and a quiet editorial feel.
          </p>
        </div>

        <div className="content-grid">
          <div className="content-card content-card--feature">
            <p className="eyebrow eyebrow--small">Featured project</p>
            <NoiseBackgroundDemoSecond />
          </div>

          <div className="content-card content-card--details">
            <h2>Current focus</h2>
            <ul>
              <li>Mocktopus — a polished web experience with a modern, memorable interface.</li>
              <li>Bharat Index — an energetic showcase built for quick exploration and strong visual storytelling.</li>
              <li>Each project is designed to feel lightweight, responsive, and easy to maintain.</li>
            </ul>
            <div className="portfolio-links">
              <a className="portfolio-link" href="https://mocktopus-two.vercel.app/" target="_blank" rel="noreferrer">
                Open Mocktopus
              </a>
              <a className="portfolio-link" href="https://thriving-sunburst-2c5550.netlify.app/" target="_blank" rel="noreferrer">
                Open Bharat Index
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
