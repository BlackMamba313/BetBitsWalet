import React from 'react';

const PartnersIcon = ({width, height}) => {
  return (
    <svg width={width || 32} height={height || 32} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gradient1" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" style={{stopColor: '#216efd', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#ff2142', stopOpacity: 1}} />
        </linearGradient>
      </defs>
      <path fill="url(#gradient1)"
            d="M31,0H1A1,1,0,0,0,0,1V13a1,1,0,0,0,1,1H6V31a1,1,0,0,0,1,1H25a1,1,0,0,0,1-1V14h5a1,1,0,0,0,1-1V1A1,1,0,0,0,31,0ZM2,2H30V4H2ZM24,30H8V10H24Zm6-18H26V10h1a1,1,0,0,0,0-2H5a1,1,0,0,0,0,2H6v2H2V6H30Z"/>
      <path fill="url(#gradient1)"
            d="M29,23a1,1,0,0,0-1,1v4a1,1,0,0,0,2,0V24A1,1,0,0,0,29,23Z"/>
      <path fill="url(#gradient1)"
            d="M3,16a1,1,0,0,0-1,1v4a1,1,0,0,0,2,0V17A1,1,0,0,0,3,16Z"/>
      <path fill="url(#gradient1)"
            d="M21,16h-.18A3,3,0,0,0,15,17a1,1,0,0,1-2,0V15a1,1,0,0,0-2,0v1a1,1,0,0,0,0,2h.18A3,3,0,0,0,17,17a1,1,0,0,1,2,0v2a1,1,0,0,0,2,0V18a1,1,0,0,0,0-2Z"/>
      <path fill="url(#gradient1)"
            d="M16,23a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0V24A1,1,0,0,0,16,23Z"/>
    </svg>
  );
};

export default PartnersIcon;