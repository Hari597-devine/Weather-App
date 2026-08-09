import { motion } from "framer-motion";

export default function SunCycle({ sunrise, sunset }) {
  const now = Date.now() / 1000;
  const progress = (now - sunrise) / (sunset - sunrise);
  const safeProgress = Math.min(Math.max(progress, 0), 1);

  const formatTime = (unixSeconds) =>
    new Date(unixSeconds * 1000).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });

  const dayLengthMinutes = Math.round((sunset - sunrise) / 60);
  const dayLengthLabel = `${Math.floor(dayLengthMinutes / 60)}h ${dayLengthMinutes % 60}m`;

  return (
    <div className="sun-cycle glass">
      <h3 className="section-title">Sunrise & Sunset</h3>

      <div className="sun-track-wrapper">
        <div className="sun-track">
          <motion.div
            className="sun"
            animate={{ left: `${safeProgress * 100}%` }}
            transition={{ duration: 2 }}
          />
        </div>
      </div>

      <div className="sun-times">
        <div className="sun-time-item">
          <span className="sun-icon">🌅</span>
          <span className="sun-time-label">Sunrise</span>
          <span className="sun-time-value">{formatTime(sunrise)}</span>
        </div>
        <div className="sun-time-item day-length">
          <span className="sun-time-label">Day length</span>
          <span className="sun-time-value">{dayLengthLabel}</span>
        </div>
        <div className="sun-time-item">
          <span className="sun-icon">🌇</span>
          <span className="sun-time-label">Sunset</span>
          <span className="sun-time-value">{formatTime(sunset)}</span>
        </div>
      </div>
    </div>
  );
}
