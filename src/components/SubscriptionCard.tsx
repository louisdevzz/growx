import React from 'react';

interface SubscriptionCardProps {
  title: string;
  price: string;
  features: string[];
  currentPlan: boolean;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ title, price, features, currentPlan }) => {
  return (
    <div className="max-w-xs border-double border-4 border-black rounded-3xl shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-gray-600 mb-4">{price}</p>
        <div className="flex justify-center">
            <button className={`py-2 px-4  mx-auto rounded-full ${currentPlan ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-700'}`}>
            {currentPlan ? 'Kế hoạch hiện tại của bạn' : 'Chọn kế hoạch này'}
            </button>
        </div>
        <ul className="list-disc list-inside my-4">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SubscriptionCard;
