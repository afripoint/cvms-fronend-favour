import React from 'react';
import timeIcon from '../../../../../assets/icons/timeIcon.png'; // Adjust the path based on your file structure

interface IconProps {
  color: string;
}

const CircleIcon: React.FC<IconProps> = () => (
  <div className="w-8 h-8 rounded-full flex items-center justify-center">
    <img 
      src={timeIcon} 
      alt="Time icon" 
      className="w-10 h-10"
    />
  </div>
);

export default CircleIcon;