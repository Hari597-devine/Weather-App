import React from "react";

export default function MoonPhase() {
  const getMoonPhaseData = (date = new Date()) => {
    // Astronomical reference point for a known New Moon
    const referenceNewMoon = new Date(Date.UTC(2000, 0, 6, 18, 14, 0));
    const synodicMonth = 29.5305877057; // Average lunar cycle length in days

    const diffDays = (date.getTime() - referenceNewMoon.getTime()) / (1000 * 60 * 60 * 24);
    const cycles = diffDays / synodicMonth;
    const currentCycle = cycles - Math.floor(cycles);
    const phaseValue = currentCycle * synodicMonth;

    // Calculate illumination percentage (0% to 100%)
    const illumination = Math.round(((1 - Math.cos(currentCycle * 2 * Math.PI)) / 2) * 100);

    // Map to 8 distinct phases
    const phaseIndex = Math.floor((phaseValue / synodicMonth) * 8 + 0.5) % 8;

    const phases = [
      { name: "New Moon", icon: "🌑" },
      { name: "Waxing Crescent", icon: "🌒" },
      { name: "First Quarter", icon: "🌓" },
      { name: "Waxing Gibbous", icon: "🌔" },
      { name: "Full Moon", icon: "🌕" },
      { name: "Waning Gibbous", icon: "🌖" },
      { name: "Last Quarter", icon: "🌗" },
      { name: "Waning Crescent", icon: "🌘" },
    ];

    // Calculate days until next Full Moon
    let daysUntilFullMoon = 0;
    const fullMoonPhase = synodicMonth / 2;
    if (phaseValue <= fullMoonPhase) {
      daysUntilFullMoon = fullMoonPhase - phaseValue;
    } else {
      daysUntilFullMoon = synodicMonth - phaseValue + fullMoonPhase;
    }
    const nextFullMoonDate = new Date(date.getTime() + daysUntilFullMoon * 24 * 60 * 60 * 1000);
    const formattedNextFullMoon = nextFullMoonDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });

    return {
      ...phases[phaseIndex],
      illumination,
      nextFullMoon: formattedNextFullMoon,
    };
  };

  const moonData = getMoonPhaseData();

  return (
    <div className="glass moon-card">
      <div className="moon-icon">{moonData.icon}</div>
      <div className="moon-text">
        <span className="moon-label">
          {moonData.illumination}% {moonData.name}
        </span>
        <span className="moon-value" style={{ fontSize: "13px", fontWeight: "500", opacity: 0.85 }}>
          Next full moon {moonData.nextFullMoon}
        </span>
      </div>
    </div>
  );
}