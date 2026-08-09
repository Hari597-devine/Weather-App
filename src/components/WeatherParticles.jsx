import { useEffect } from "react";

export default function WeatherParticles({ type }) {
  useEffect(() => {
    if (!type || type === "clear") return;

    const container = document.body;
    let active = true;

    const createParticle = () => {
      if (!active) return;
      
      const el = document.createElement("div");
      
      if (type === "rain") {
        el.className = "weather-particle rain";
        el.style.left = Math.random() * 100 + "vw";
        el.style.width = Math.random() * 1.5 + 0.5 + "px";
        el.style.height = Math.random() * 15 + 10 + "px";
        el.style.animationDuration = Math.random() * 0.8 + 1.2 + "s"; // Slower fall
        el.style.opacity = Math.random() * 0.3 + 0.2;
      } else if (type === "snow") {
        el.className = "weather-particle snow";
        el.style.left = Math.random() * 100 + "vw";
        el.style.width = Math.random() * 4 + 2 + "px";
        el.style.height = el.style.width;
        el.style.animationDuration = Math.random() * 4 + 5 + "s"; // Soothing fall
        el.style.opacity = Math.random() * 0.5 + 0.3;
      } else if (type === "mist" || type === "fog" || type === "haze") {
        el.className = "weather-particle mist";
        el.style.left = Math.random() * 100 + "vw";
        el.style.top = Math.random() * 70 + 10 + "vh";
        el.style.width = Math.random() * 250 + 200 + "px"; // Larger and softer
        el.style.height = el.style.width;
        el.style.animationDuration = Math.random() * 25 + 25 + "s"; // Extremely slow drift
        el.style.opacity = Math.random() * 0.03 + 0.01; // Very subtle, barely visible
      }

      container.appendChild(el);

      // Clean up after animation ends
      setTimeout(() => {
        el.remove();
      }, type === "mist" || type === "fog" || type === "haze" ? 60000 : 6000);
    };

    // Substantially slower spawn rates for premium visuals
    const spawnRate = type === "rain" ? 100 : type === "snow" ? 350 : 6000;
    const interval = setInterval(createParticle, spawnRate);

    return () => {
      active = false;
      clearInterval(interval);
      // Clean up existing particles
      const particles = document.querySelectorAll(".weather-particle");
      particles.forEach(p => p.remove());
    };
  }, [type]);

  return null;
}