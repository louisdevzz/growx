import React from 'react';

interface FundingBoxProps {
  amount: number;
  donors: number;
}

export const FundingBox: React.FC<FundingBoxProps> = ({ amount, donors }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="text-2xl font-bold">${amount.toLocaleString()}</div>
      <div className="text-gray-600">{donors} donors</div>
    </div>
  );
}; 