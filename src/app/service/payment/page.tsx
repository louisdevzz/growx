import Header from '@/components/Header';
import React from 'react';

const PaymentPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side (Services) */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Services</h2>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Website Design</h3>
            <p>Quantity: 1</p>
            <p>Price: $958</p>
            <p>Description: A fully custom 4-page website. Includes 2 edit rounds.</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Social Media</h3>
            <p>Quantity: 3</p>
            <p>Price: $600 (monthly)</p>
            <p>Description: Content creation & posting for 3 social media platforms.</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Web Hosting</h3>
            <p>Quantity: 1</p>
            <p>Price: $99 (monthly)</p>
            <p>Description: Complete web hosting with 99.9% uptime. Includes plugin updates.</p>
          </div>
          <div className="mt-4">
            <p>Single: $958</p>
            <p>Recurring: $699</p>
            <p>Total: $1657</p>
          </div>
        </div>

        {/* Right Side (Payment Info) */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Payment Information</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Payment Method</label>
              <select className="w-full p-2 border rounded">
                <option>Credit Card</option>
                <option>PayPal</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Name on Card</label>
              <input type="text" className="w-full p-2 border rounded" defaultValue="Marcus Ramsey" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Card Number</label>
              <input type="text" className="w-full p-2 border rounded" defaultValue="**** **** **** 1234" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Expiration Date</label>
              <input type="text" className="w-full p-2 border rounded" defaultValue="06/2028" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">CVV</label>
              <input type="text" className="w-full p-2 border rounded" defaultValue="201" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                <input type="checkbox" className="mr-2" defaultChecked />
                Save Payment on File
              </label>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
              Pay Marcus
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
