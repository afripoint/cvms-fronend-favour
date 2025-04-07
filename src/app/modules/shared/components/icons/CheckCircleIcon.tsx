
import React from 'react';
import messageIcon from '../../../../../assets/icons/messageicon.svg';

interface IconProps {
  color: string;
}

const CheckCircleIcon: React.FC<IconProps> = () => (
  <div className="w-8 h-8 rounded-full flex items-center justify-center">
    <img 
      src={messageIcon} 
      alt="Time icon" 
      className="w-10 h-10"
    />
  </div>
);

export default CheckCircleIcon;