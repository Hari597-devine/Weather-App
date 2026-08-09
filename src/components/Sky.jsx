import { useEffect } from "react";

export default function Sky({ condition, isDay }) {
  useEffect(() => {
    const canvas = document.getElementById("sky");
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    // Weather particles/elements state
    let elements = [];
    const mainCondition = condition ? condition.toLowerCase() : "clear";

    // Initialize elements based on condition
    if (mainCondition.includes("cloud")) {
      // Create multi-layered clouds
      for (let i = 0; i < 18; i++) {
        elements.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.4,
          radius: 40 + Math.random() * 50,
          speed: 0.1 + Math.random() * 0.3,
          opacity: 0.1 + Math.random() * 0.15,
        });
      }
    } else if (mainCondition.includes("rain") || mainCondition.includes("drizzle") || mainCondition.includes("thunder")) {
      // Create raindrops splashing on canvas
      for (let i = 0; i < 40; i++) {
        elements.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          len: 10 + Math.random() * 15,
          speed: 8 + Math.random() * 6,
        });
      }
    } else if (mainCondition.includes("snow")) {
      // Create falling crystals
      for (let i = 0; i < 30; i++) {
        elements.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: 2 + Math.random() * 3,
          speed: 0.8 + Math.random() * 1.2,
          swing: Math.random() * 2,
          swingSpeed: 0.01 + Math.random() * 0.02,
        });
      }
    } else if (!isDay) {
      // Create twinkling stars for clear nights
      for (let i = 0; i < 60; i++) {
        elements.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.7,
          radius: 0.5 + Math.random() * 1.2,
          alpha: Math.random(),
          alphaSpeed: 0.005 + Math.random() * 0.015,
        });
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw Celestial Body (Sun/Moon) if sky is relatively clear/cloudy but not heavy rain/snow/fog
      if (!mainCondition.includes("rain") && !mainCondition.includes("snow") && !mainCondition.includes("thunder") && !mainCondition.includes("mist") && !mainCondition.includes("fog")) {
        ctx.save();
        if (isDay) {
          // Draw Glowing Sun
          const sunX = canvas.width * 0.85;
          const sunY = 120;
          const gradient = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, 120);
          gradient.addColorStop(0, "rgba(253, 224, 71, 1)");
          gradient.addColorStop(0.2, "rgba(253, 224, 71, 0.4)");
          gradient.addColorStop(1, "rgba(253, 224, 71, 0)");
          ctx.beginPath();
          ctx.arc(sunX, sunY, 120, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        } else {
          // Draw Crescent Moon
          const moonX = canvas.width * 0.85;
          const moonY = 120;
          
          // Glow effect
          const gradient = ctx.createRadialGradient(moonX, moonY, 10, moonX, moonY, 70);
          gradient.addColorStop(0, "rgba(241, 245, 249, 0.3)");
          gradient.addColorStop(1, "rgba(241, 245, 249, 0)");
          ctx.beginPath();
          ctx.arc(moonX, moonY, 70, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
          
          // Moon Shape
          ctx.beginPath();
          ctx.arc(moonX, moonY, 28, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(241, 245, 249, 0.9)";
          ctx.fill();
          
          // Subtract to create crescent
          ctx.beginPath();
          ctx.arc(moonX - 8, moonY - 4, 28, 0, Math.PI * 2);
          ctx.fillStyle = isDay ? "rgba(240, 246, 255, 1)" : "rgba(12, 21, 36, 1)"; // matches dark mode background tone
          ctx.fill();
        }
        ctx.restore();
      }

      // 2. Draw condition-specific elements
      if (mainCondition.includes("cloud")) {
        // Draw cumulative cloud blobs
        elements.forEach((c) => {
          ctx.beginPath();
          ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
          ctx.fillStyle = isDay 
            ? `rgba(255, 255, 255, ${c.opacity})` 
            : `rgba(148, 163, 184, ${c.opacity})`;
          ctx.fill();

          c.x += c.speed;
          if (c.x > canvas.width + c.radius) c.x = -c.radius;
        });
      } else if (mainCondition.includes("rain") || mainCondition.includes("drizzle") || mainCondition.includes("thunder")) {
        // Draw raindrop canvas falls
        ctx.strokeStyle = "rgba(156, 163, 175, 0.4)";
        ctx.lineWidth = 1;
        elements.forEach((r) => {
          ctx.beginPath();
          ctx.moveTo(r.x, r.y);
          ctx.lineTo(r.x + 2, r.y + r.len);
          ctx.stroke();

          r.y += r.speed;
          r.x += 0.5;
          if (r.y > canvas.height) {
            r.y = -r.len;
            r.x = Math.random() * canvas.width;
          }
        });
      } else if (mainCondition.includes("snow")) {
        // Draw soft falling snow blobs
        ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
        elements.forEach((s) => {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
          ctx.fill();

          s.y += s.speed;
          s.x += Math.sin(s.swing) * 0.5;
          s.swing += s.swingSpeed;

          if (s.y > canvas.height) {
            s.y = -5;
            s.x = Math.random() * canvas.width;
          }
        });
      } else if (!isDay) {
        // Draw twinkling stars
        elements.forEach((star) => {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
          ctx.fill();

          star.alpha += star.alphaSpeed;
          if (star.alpha > 1 || star.alpha < 0) {
            star.alphaSpeed = -star.alphaSpeed;
          }
        });
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [condition, isDay]);

  return <canvas id="sky" style={{ position: "fixed", top: 0, left: 0, zIndex: 0, pointerEvents: "none" }} />;
}