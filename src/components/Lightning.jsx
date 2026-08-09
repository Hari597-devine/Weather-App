import { useEffect, useRef } from "react";

export default function Lightning({ condition }) {
  const lightningRef = useRef(null);

  useEffect(() => {
    if (condition !== "Thunderstorm") return;

    let timeoutId = null;
    let flashTimeoutId = null;

    const flash = () => {
      if (lightningRef.current) {
        lightningRef.current.style.opacity = "1";
      }

      flashTimeoutId = setTimeout(() => {
        if (lightningRef.current) {
          lightningRef.current.style.opacity = "0";
        }
      }, 100);

      timeoutId = setTimeout(flash, Math.random() * 5000 + 2000);
    };

    flash();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (flashTimeoutId) clearTimeout(flashTimeoutId);
    };
  }, [condition]);

  return <div ref={lightningRef} className="lightning"></div>;
}