import React, { useState, useEffect } from 'react';
import './App.css';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import useLocalStorage from './hooks/useLocalStorage';

import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function App() {
  const [theme, setTheme] = useLocalStorage('theme', 'dark');
  const [unit, setUnit] = useLocalStorage('unit', 'metric'); // 'metric' = Celsius, 'imperial' = Fahrenheit
  const [activeTab, setActiveTab] = useState('home');

  // Apply theme to <html> on mount and on change
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleThemeToggle = (e) => {
    const newTheme = e.target.checked ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <div data-theme={theme}>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-logo">
          <span className="logo-icon">⛅</span>
          <h2>WeatherPro</h2>
        </div>
        <div className="nav-links">
          <a
            href="#home"
            className={activeTab === 'home' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('home');
            }}
          >
            Home
          </a>
          <a
            href="#about"
            className={activeTab === 'about' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('about');
            }}
          >
            About
          </a>
          <a
            href="#contact"
            className={activeTab === 'contact' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('contact');
            }}
          >
            Contact
          </a>
        </div>
        <div className="nav-controls">
          <div
            className="unit-segmented-control"
            onClick={() => setUnit(unit === 'metric' ? 'imperial' : 'metric')}
            aria-label="Toggle Temperature Unit"
          >
            <div className={`segmented-slider ${unit === 'metric' ? 'left' : 'right'}`}></div>
            <div className={`segmented-option ${unit === 'metric' ? 'active' : ''}`}>°C</div>
            <div className={`segmented-option ${unit === 'imperial' ? 'active' : ''}`}>°F</div>
          </div>
          <div className="theme-switch-wrapper">
            <span className="theme-icon-label">{theme === 'dark' ? '🌙' : '☀️'}</span>
            <label className="theme-switch">
              <input type="checkbox" checked={theme === 'dark'} onChange={handleThemeToggle} />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </nav>

      {/* PAGE CONTENT */}
      {activeTab === 'home' && <Home unit={unit} />}
      {activeTab === 'about' && <About />}
      {activeTab === 'contact' && <Contact />}
    </div>
  );
}