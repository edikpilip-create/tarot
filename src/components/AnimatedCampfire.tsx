import type { CSSProperties } from "react";

import styles from "./AnimatedCampfire.module.css";

const sparks = [
  { x: 46, dx: "-14px", delay: "-0.4s", duration: "4.8s", size: 3 },
  { x: 52, dx: "11px", delay: "-1.6s", duration: "5.4s", size: 2 },
  { x: 41, dx: "-8px", delay: "-2.5s", duration: "4.2s", size: 2 },
  { x: 58, dx: "16px", delay: "-3.2s", duration: "5.8s", size: 3 },
  { x: 49, dx: "7px", delay: "-0.9s", duration: "4.6s", size: 2 },
  { x: 63, dx: "20px", delay: "-2.1s", duration: "6s", size: 2 },
  { x: 37, dx: "-18px", delay: "-3.7s", duration: "5.2s", size: 2 },
  { x: 54, dx: "-6px", delay: "-1.1s", duration: "4.9s", size: 3 },
  { x: 44, dx: "13px", delay: "-4.3s", duration: "5.6s", size: 2 },
  { x: 60, dx: "-10px", delay: "-2.9s", duration: "4.4s", size: 2 },
  { x: 50, dx: "18px", delay: "-5s", duration: "6.2s", size: 3 },
  { x: 39, dx: "9px", delay: "-1.8s", duration: "5s", size: 2 }
] as const;

export function AnimatedCampfire() {
  return (
    <div className={styles.campfire}>
      <div className={styles.groundGlow} />
      <div className={styles.aura} />
      <div className={styles.heatWave} />
      <div className={styles.sparkLayer} aria-hidden="true">
        {sparks.map((spark, index) => (
          <span
            key={`${spark.x}-${index}`}
            className={styles.spark}
            style={
              {
                "--spark-x": `${spark.x}%`,
                "--spark-dx": spark.dx,
                "--spark-delay": spark.delay,
                "--spark-duration": spark.duration,
                "--spark-size": `${spark.size}px`
              } as CSSProperties
            }
          />
        ))}
      </div>

      <svg className={styles.fireSvg} viewBox="0 0 160 178" role="presentation" focusable="false" aria-hidden="true">
        <defs>
          <radialGradient id="emberGlow" cx="50%" cy="50%" r="58%">
            <stop offset="0%" stopColor="#fff1a8" />
            <stop offset="28%" stopColor="#ffb538" />
            <stop offset="66%" stopColor="#ab3215" />
            <stop offset="100%" stopColor="#241009" />
          </radialGradient>
          <linearGradient id="outerFlame" x1="0" x2="0" y1="1" y2="0">
            <stop offset="0%" stopColor="#7e1d12" />
            <stop offset="42%" stopColor="#ee5c17" />
            <stop offset="100%" stopColor="#ff9f2d" />
          </linearGradient>
          <linearGradient id="middleFlame" x1="0" x2="0" y1="1" y2="0">
            <stop offset="0%" stopColor="#d43a0d" />
            <stop offset="46%" stopColor="#ff8b18" />
            <stop offset="100%" stopColor="#ffd35c" />
          </linearGradient>
          <linearGradient id="innerFlame" x1="0" x2="0" y1="1" y2="0">
            <stop offset="0%" stopColor="#ffb22a" />
            <stop offset="48%" stopColor="#ffe06b" />
            <stop offset="100%" stopColor="#fff8d8" />
          </linearGradient>
          <linearGradient id="logGradient" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#23120c" />
            <stop offset="42%" stopColor="#80411e" />
            <stop offset="100%" stopColor="#1c0e09" />
          </linearGradient>
          <filter id="softFireGlow" x="-45%" y="-45%" width="190%" height="190%">
            <feGaussianBlur stdDeviation="3.2" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0.9 0 0.52 0 0 0.23 0 0 0.2 0 0.04 0 0 0 0.76 0"
            />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <ellipse className={styles.emberBed} cx="80" cy="145" rx="55" ry="19" fill="url(#emberGlow)" />
        <g className={styles.coals}>
          <ellipse cx="55" cy="143" rx="10" ry="6" />
          <ellipse cx="76" cy="149" rx="12" ry="7" />
          <ellipse cx="96" cy="144" rx="11" ry="6" />
          <ellipse cx="111" cy="152" rx="8" ry="5" />
        </g>

        <g className={styles.flameGroup} filter="url(#softFireGlow)">
          <path
            className={`${styles.flame} ${styles.outerFlame} ${styles.flameOne}`}
            d="M80 145 C47 116 52 91 69 65 C77 51 78 34 72 20 C97 40 119 70 112 101 C108 121 98 133 80 145 Z"
            fill="url(#outerFlame)"
          />
          <path
            className={`${styles.flame} ${styles.outerFlame} ${styles.flameTwo}`}
            d="M72 147 C42 126 34 98 51 76 C61 62 61 48 57 36 C78 50 90 73 84 100 C80 119 80 134 72 147 Z"
            fill="url(#outerFlame)"
          />
          <path
            className={`${styles.flame} ${styles.outerFlame} ${styles.flameThree}`}
            d="M92 147 C124 123 130 97 112 72 C101 56 98 42 105 28 C82 48 72 77 83 103 C91 122 93 135 92 147 Z"
            fill="url(#outerFlame)"
          />
          <path
            className={`${styles.flame} ${styles.middleFlame} ${styles.flameFour}`}
            d="M79 146 C58 124 57 98 73 75 C84 59 85 48 82 36 C99 55 107 79 99 101 C92 119 91 134 79 146 Z"
            fill="url(#middleFlame)"
          />
          <path
            className={`${styles.flame} ${styles.middleFlame} ${styles.flameFive}`}
            d="M74 146 C62 129 67 112 80 95 C89 83 91 72 88 60 C105 82 112 107 98 125 C90 135 84 141 74 146 Z"
            fill="url(#middleFlame)"
          />
          <path
            className={`${styles.innerFlame} ${styles.innerOne}`}
            d="M80 145 C66 128 69 107 81 88 C89 75 91 63 88 50 C103 72 104 98 94 119 C89 130 86 139 80 145 Z"
            fill="url(#innerFlame)"
          />
          <path
            className={`${styles.innerFlame} ${styles.innerTwo}`}
            d="M70 145 C61 132 63 118 73 106 C80 97 82 89 79 80 C91 94 94 113 84 128 C78 136 74 141 70 145 Z"
            fill="url(#innerFlame)"
          />
        </g>

        <g className={styles.logs}>
          <path d="M28 143 C54 129 85 127 132 136 L128 149 C85 145 54 149 31 158 Z" fill="url(#logGradient)" />
          <path d="M35 131 C63 139 94 151 124 164 L118 173 C86 156 57 147 29 140 Z" fill="url(#logGradient)" />
          <path d="M48 162 C74 145 100 134 132 126 L137 138 C108 145 82 159 55 174 Z" fill="url(#logGradient)" />
          <path className={styles.logHighlight} d="M43 139 C72 132 102 133 127 138" />
          <path className={styles.logHighlight} d="M48 137 C76 146 95 153 117 163" />
          <path className={styles.logHighlight} d="M61 163 C88 149 110 139 130 134" />
        </g>
      </svg>
    </div>
  );
}
