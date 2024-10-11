import React from 'react';

const ReseiveIcon = ({width, height}) => {
  return (
    <svg width={width || 32} height={height || 32} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gradient1" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" style={{stopColor: '#216efd', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#ff2142', stopOpacity: 1}} />
        </linearGradient>
      </defs>
      <path fill="url(#gradient1)"
        d="M5 20H19M12 4V16M12 16L15 13M12 16L9 13"
            stroke="url(#gradient1)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"/>
    </svg>
  );
};

export default ReseiveIcon;