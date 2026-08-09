import { Link, useLocation } from "react-router-dom";

export default function Navbar({ theme, setTheme, unit, setUnit }) {
  const location = useLocation();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleUnit = () => {
    setUnit(unit === "metric" ? "imperial" : "metric");
  };

  return (
    <nav className="navbar glass animate-fade-in">
      <div className="nav-logo">
        <span className="logo-icon">⛅</span>
        <h2>Weather</h2>
      </div>

      <div className="nav-links">
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
        <Link to="/about" className={location.pathname === "/about" ? "active" : ""}>About</Link>
        <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>Contact</Link>
      </div>

      <div className="nav-controls">
        {/* Segmented Unit Selector */}
        <div className="unit-segmented-control" onClick={toggleUnit} title="Toggle temperature unit">
          <div className={`segmented-slider ${unit === "metric" ? "left" : "right"}`} />
          <span className={`segmented-option ${unit === "metric" ? "active" : ""}`}>°C</span>
          <span className={`segmented-option ${unit === "imperial" ? "active" : ""}`}>°F</span>
        </div>

        {/* Theme Slider Toggle Switch */}
        <div className="theme-switch-wrapper" title="Toggle theme mode">
          <span className="theme-icon-label">{theme === "dark" ? "🌙" : "☀️"}</span>
          <label className="theme-switch" htmlFor="theme-checkbox">
            <input 
              type="checkbox" 
              id="theme-checkbox" 
              checked={theme === "dark"} 
              onChange={toggleTheme} 
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </nav>
  );
}