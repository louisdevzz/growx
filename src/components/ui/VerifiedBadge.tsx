import React from 'react';
import { CheckCircle } from 'lucide-react';

interface VerifiedBadgeProps {
  className?: string;
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ className }) => {
  return (
    <CheckCircle
      className={`text-blue-500 inline-block ${className || ''}`}
      size={16}
    />
  );
}; 