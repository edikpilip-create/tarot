"use client";

import type { CSSProperties } from "react";
import { useEffect } from "react";

const cosmicStars = [
  { x: "6%", y: "12%", size: 2, delay: "-1.2s", duration: "8.4s" },
  { x: "14%", y: "42%", size: 3, delay: "-5.1s", duration: "10.6s" },
  { x: "20%", y: "74%", size: 2, delay: "-2.7s", duration: "9.2s" },
  { x: "27%", y: "18%", size: 3, delay: "-7.4s", duration: "12.8s" },
  { x: "34%", y: "62%", size: 2, delay: "-3.2s", duration: "8.8s" },
  { x: "42%", y: "31%", size: 4, delay: "-6.6s", duration: "11.4s" },
  { x: "49%", y: "82%", size: 2, delay: "-4.1s", duration: "10.2s" },
  { x: "56%", y: "14%", size: 2, delay: "-8.7s", duration: "13.2s" },
  { x: "62%", y: "51%", size: 3, delay: "-1.9s", duration: "9.8s" },
  { x: "69%", y: "28%", size: 2, delay: "-5.8s", duration: "10.9s" },
  { x: "75%", y: "70%", size: 3, delay: "-2.3s", duration: "12.1s" },
  { x: "82%", y: "18%", size: 2, delay: "-6.9s", duration: "9.4s" },
  { x: "91%", y: "47%", size: 4, delay: "-4.8s", duration: "11.8s" },
  { x: "96%", y: "79%", size: 2, delay: "-7.6s", duration: "10.4s" }
] as const;

const cosmicParticles = [
  { x: "9%", y: "66%", size: 74, delay: "-8s", duration: "28s" },
  { x: "22%", y: "26%", size: 46, delay: "-15s", duration: "34s" },
  { x: "38%", y: "78%", size: 58, delay: "-11s", duration: "31s" },
  { x: "58%", y: "37%", size: 42, delay: "-19s", duration: "36s" },
  { x: "73%", y: "15%", size: 64, delay: "-6s", duration: "30s" },
  { x: "88%", y: "64%", size: 52, delay: "-23s", duration: "38s" }
] as const;

export function CosmicBackground() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compactViewport = window.matchMedia("(max-width: 767px)");

    let frameId = 0;

    function updateParallax() {
      frameId = 0;

      if (reducedMotion.matches || compactViewport.matches) {
        root.style.setProperty("--cosmic-parallax-y", "0px");
        return;
      }

      const offset = Math.min(window.scrollY * 0.025, 42);
      root.style.setProperty("--cosmic-parallax-y", `${offset.toFixed(2)}px`);
    }

    function requestParallaxUpdate() {
      if (!frameId) {
        frameId = window.requestAnimationFrame(updateParallax);
      }
    }

    updateParallax();
    window.addEventListener("scroll", requestParallaxUpdate, { passive: true });
    window.addEventListener("resize", requestParallaxUpdate);
    reducedMotion.addEventListener("change", requestParallaxUpdate);
    compactViewport.addEventListener("change", requestParallaxUpdate);

    return () => {
      window.removeEventListener("scroll", requestParallaxUpdate);
      window.removeEventListener("resize", requestParallaxUpdate);
      reducedMotion.removeEventListener("change", requestParallaxUpdate);
      compactViewport.removeEventListener("change", requestParallaxUpdate);
      window.cancelAnimationFrame(frameId);
      root.style.removeProperty("--cosmic-parallax-y");
    };
  }, []);

  return (
    <div className="cosmic-background" aria-hidden="true">
      <div className="cosmic-background-image" />
      <div className="cosmic-background-overlay" />
      <div className="cosmic-background-stars">
        {cosmicStars.map((star, index) => (
          <span
            key={`${star.x}-${star.y}-${index}`}
            className="cosmic-star"
            style={
              {
                "--x": star.x,
                "--y": star.y,
                "--star-size": `${star.size}px`,
                "--star-delay": star.delay,
                "--star-duration": star.duration
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div className="cosmic-background-particles">
        {cosmicParticles.map((particle, index) => (
          <span
            key={`${particle.x}-${particle.y}-${index}`}
            className="cosmic-particle"
            style={
              {
                "--x": particle.x,
                "--y": particle.y,
                "--particle-size": `${particle.size}px`,
                "--particle-delay": particle.delay,
                "--particle-duration": particle.duration
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
