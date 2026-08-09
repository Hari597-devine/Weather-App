import { useMemo } from "react";

export default function ClimateVibe({ condition, isDay }) {
  const weatherMain = condition ? condition.toLowerCase() : "clear";

  const vibeData = useMemo(() => {
    if (weatherMain === "snow") return { label: "Snowfall", type: "snow" };
    if (["rain", "drizzle"].includes(weatherMain)) return { label: "Rainy", type: "rain" };
    if (weatherMain === "thunderstorm") return { label: "Thunderstorm", type: "thunder" };
    if (["mist", "fog", "haze", "smoke"].includes(weatherMain)) return { label: "Misty", type: "mist" };
    if (weatherMain === "clouds") return { label: "Cloudy", type: "clouds" };
    return { label: isDay ? "Clear Sky" : "Starry Night", type: isDay ? "clear-day" : "clear-night" };
  }, [weatherMain, isDay]);

  return (
    <div className="glass climate-vibe-card">
      <h3 className="section-title">Climate Vibe</h3>
      <div className={`vibe-stage vibe-${vibeData.type}`}>
        {/* Rain */}
        {vibeData.type === "rain" && (
          <>
            <div className="vibe-cloud vibe-cloud-1"></div>
            <div className="vibe-cloud vibe-cloud-2"></div>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="vibe-raindrop" style={{
                left: `${8 + i * 7.5}%`,
                animationDelay: `${Math.random() * 1}s`,
                animationDuration: `${0.6 + Math.random() * 0.4}s`,
              }} />
            ))}
          </>
        )}

        {/* Thunder */}
        {vibeData.type === "thunder" && (
          <>
            <div className="vibe-cloud vibe-cloud-1 vibe-cloud-dark"></div>
            <div className="vibe-cloud vibe-cloud-2 vibe-cloud-dark"></div>
            <div className="vibe-lightning-bolt"></div>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="vibe-raindrop" style={{
                left: `${10 + i * 10}%`,
                animationDelay: `${Math.random() * 0.6}s`,
                animationDuration: `${0.5 + Math.random() * 0.3}s`,
              }} />
            ))}
          </>
        )}

        {/* Snow */}
        {vibeData.type === "snow" && (
          <>
            <div className="vibe-cloud vibe-cloud-1 vibe-cloud-snow"></div>
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="vibe-snowflake" style={{
                left: `${5 + i * 6}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2.5 + Math.random() * 2}s`,
                fontSize: `${6 + Math.random() * 6}px`,
              }} />
            ))}
          </>
        )}

        {/* Clouds */}
        {vibeData.type === "clouds" && (
          <>
            <div className="vibe-cloud vibe-cloud-1"></div>
            <div className="vibe-cloud vibe-cloud-2"></div>
            <div className="vibe-cloud vibe-cloud-3"></div>
          </>
        )}

        {/* Clear Day */}
        {vibeData.type === "clear-day" && (
          <>
            <div className="vibe-sun"></div>
            <div className="vibe-sun-rays"></div>
          </>
        )}

        {/* Clear Night */}
        {vibeData.type === "clear-night" && (
          <>
            <div className="vibe-moon"></div>
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="vibe-star" style={{
                left: `${Math.random() * 90}%`,
                top: `${Math.random() * 70}%`,
                animationDelay: `${Math.random() * 3}s`,
                width: `${1 + Math.random() * 2}px`,
                height: `${1 + Math.random() * 2}px`,
              }} />
            ))}
          </>
        )}

        {/* Mist */}
        {vibeData.type === "mist" && (
          <>
            <div className="vibe-mist-layer vibe-mist-1"></div>
            <div className="vibe-mist-layer vibe-mist-2"></div>
            <div className="vibe-mist-layer vibe-mist-3"></div>
          </>
        )}
      </div>
      <div className="vibe-label">{vibeData.label}</div>
    </div>
  );
}
