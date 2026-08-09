export default function HourlyForecast({ data }) {
  if (!data) return null;

  // Hourly forecast for the next 8 intervals
  const hourly = data.list.slice(0, 8);
  const daily = data.list.filter((_, i) => i % 8 === 0).slice(0, 7);

  // SVG Curve calculations for Hourly graph
  const temps = hourly.map(h => h.main.temp);
  const maxTemp = Math.max(...temps);
  const minTemp = Math.min(...temps);
  const range = maxTemp - minTemp || 1;
  const svgHeight = 60;
  
  // Create polygon points: starting from bottom-left, drawing points, ending at bottom-right
  const points = hourly.map((h, i) => {
    const x = (i / (hourly.length - 1)) * 100;
    const y = svgHeight - ((h.main.temp - minTemp) / range) * (svgHeight - 10) - 5;
    return `${x},${y}`;
  });
  const polygonPoints = `0,${svgHeight} ${points.join(" ")} 100,${svgHeight}`;

  return (
    <>
      <div className="glass hourly-container">
        <h3 className="section-title">Hourly Forecast</h3>
        <div className="hourly-scroll-wrapper">
          <div className="hourly-chart-area">
            <svg className="temp-curve" viewBox="0 0 100 60" preserveAspectRatio="none" width="100%" height="100%">
              <polygon points={polygonPoints} fill="var(--accent-bg)" opacity="0.4" />
              <polyline points={points.join(" ")} fill="none" stroke="var(--accent-color)" strokeWidth="2" />
            </svg>
            
            <div className="hourly-items">
              {hourly.map((h, i) => {
                const time = new Date(h.dt * 1000).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  hour12: true,
                });
                const pop = Math.round((h.pop || 0) * 100);
                
                return (
                  <div key={i} className="hour-card">
                    <p className="time">{time}</p>
                    <img
                      src={`https://openweathermap.org/img/wn/${h.weather[0].icon}.png`}
                      alt={h.weather[0].description}
                    />
                    <p className="temp">{Math.round(h.main.temp)}°</p>
                    <div className="pop">
                      <span className="drop">💧</span> {pop}%
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="glass daily-container">
        <h3 className="section-title">7-Day Forecast</h3>
        <div className="weekly">
          {daily.map((d, i) => {
            const pop = Math.round((d.pop || 0) * 100);
            return (
              <div key={i} className="day-card">
                <p className="day-name">
                  {new Date(d.dt * 1000).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </p>
                <img
                  src={`https://openweathermap.org/img/wn/${d.weather[0].icon}.png`}
                  alt={d.weather[0].description}
                />
                <p className="day-temp">{Math.round(d.main.temp)}°</p>
                <div className="pop">
                  <span className="drop">💧</span> {pop}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}