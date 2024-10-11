import React from 'react';

const SecurityIcon = ({width, height, color}) => {
  return (
    <svg
      width={width || 14}
      height={height || 18}
      viewBox="0 0 28 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.382 0.777344L0.882004 7.30197V17.0889C0.882004 26.1418 6.642 34.6076 14.382 36.6628C22.122 34.6076 27.882 26.1418 27.882 17.0889V7.30197L14.382 0.777344ZM14.382 18.7038H24.882C24.082 25.4241 19.962 31.4105 14.382 33.2918V18.7201H3.882V9.42248L14.382 4.34958V18.7038Z"
        fill={color || '#EF004A'}/>
    </svg>
  );
};

export default SecurityIcon;