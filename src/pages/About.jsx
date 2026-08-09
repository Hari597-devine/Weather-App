export default function About() {
  const techStack = [
    { name: "React 19 & Vite", category: "Framework & Bundler", desc: "For lightning-fast development, hot reloading, and optimized client build.", icon: "⚛️" },
    { name: "React Router v7", category: "Navigation", desc: "Single-page router for instantaneous page transitions without browser refreshes.", icon: "🗺️" },
    { name: "OpenWeatherMap API", category: "Data Engine", desc: "Fetches live weather metrics, hourly/5-day forecasts, and air pollution analytics.", icon: "📡" },
    { name: "Axios", category: "HTTP Client", desc: "Handles asynchronous promises and fetches data in parallel safely.", icon: "🔄" },
    { name: "Leaflet Maps & OpenStreetMap", category: "Visualization", desc: "Provides high-performance, interactive geographical maps for search queries.", icon: "📍" },
    { name: "CSS Custom Properties & Canvas", category: "Design System", desc: "Glassmorphic panels, dark/light modes, and real-time canvas clouds animation.", icon: "🎨" }
  ];

  return (
    <div className="about-page container">
      <div className="glass about-hero">
        <h1>About WeatherPro</h1>
        <p className="subtitle">A premium, responsive weather dashboard built with state-of-the-art web technologies.</p>
      </div>

      <div className="tech-grid">
        {techStack.map((tech, idx) => (
          <div key={idx} className="glass tech-card">
            <div className="tech-icon">{tech.icon}</div>
            <div className="tech-info">
              <span className="tech-category">{tech.category}</span>
              <h3>{tech.name}</h3>
              <p>{tech.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}