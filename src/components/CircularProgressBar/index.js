import React from 'react';
import styles from './CircularProgressBar.module.css';

const CircularProgressBar = ({ value }) => {
  const radius = 40; // радиус круга
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference; // длина оставшейся части

  return (
    <div className={styles.progressCircle}>
      <svg width="80%" height="80%" viewBox="0 0 100 100" className={styles.progressSvg}>
        <circle
          className={styles.progressBackground}
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
        />
        <circle
          className={styles.progressValue}
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className={styles.progressText}>
        YOUR<br />
        KPI {value}%
      </div>
    </div>
  );
};

export default CircularProgressBar;

