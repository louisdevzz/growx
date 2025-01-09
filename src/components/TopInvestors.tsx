"use client"

import { useState } from 'react'

export default function TopInvestors() {
  const [activeTab, setActiveTab] = useState('all')
  
  const investors = [
    { id: 1, name: "@johndoe", amount: "275.5k BNB", image: "/investors/1.jpg", isNew: true },
    { id: 2, name: "@janesmith", amount: "225.3k BNB", image: "/investors/2.jpg", isNew: false },
    { id: 3, name: "@robert", amount: "180.8k BNB", image: "/investors/3.jpg", isNew: true },
    { id: 4, name: "@michael", amount: "150.2k BNB", image: "/investors/4.jpg", isNew: false },
    { id: 5, name: "@sarah", amount: "125.4k BNB", image: "/investors/5.jpg", isNew: true },
    { id: 6, name: "@emma", amount: "115.2k BNB", image: "/investors/6.jpg", isNew: false },
    { id: 7, name: "@david", amount: "98.7k BNB", image: "/investors/7.jpg", isNew: true },
    { id: 8, name: "@sophia", amount: "92.4k BNB", image: "/investors/8.jpg", isNew: false },
    { id: 9, name: "@lucas", amount: "85.1k BNB", image: "/investors/9.jpg", isNew: true },
    { id: 10, name: "@olivia", amount: "77.8k BNB", image: "/investors/10.jpg", isNew: false }
  ]

  const filteredInvestors = activeTab === 'new' 
    ? investors.filter(inv => inv.isNew)
    : investors

  return (
    <div className="w-full bg-white container mx-auto px-4">
      <div className="px-4 py-3">
        {/* Header with Title and See More */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-3xl font-bold text-center w-full">Top Investors</h2>
        </div>
        
        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-4 py-1 rounded-full text-xs ${
              activeTab === 'all' 
                ? 'bg-black text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setActiveTab('new')}
            className={`px-4 py-1 rounded-full text-xs ${
              activeTab === 'new' 
                ? 'bg-black text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            New
          </button>
        </div>

        {/* Investors List - 2 Columns */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
          {filteredInvestors.map((investor, index) => (
            <div 
              key={investor.id} 
              className="flex items-center group hover:bg-gray-50 p-2 rounded-lg transition-colors border border-gray-100"
            >
              <span className="text-sm text-gray-400 w-6">{index + 1}</span>
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <img 
                  src={investor.image} 
                  alt={investor.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="flex-1 ml-3">
                <h3 className="text-sm font-medium text-gray-800 group-hover:text-black">
                  {investor.name}
                </h3>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-emerald-500 font-medium">Floor:</span>
                  <span className="text-xs text-gray-600">{investor.amount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 