"use client";

import Image from 'next/image'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ProjectProps } from '@/types/project';


const truncate = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

// Định nghĩa mảng các màu gradient và text color
const THEME_COLORS = [
  {
    gradient: "from-blue-400 to-blue-500",
    text: "text-blue-600"
  },
  {
    gradient: "from-purple-400 to-purple-500",
    text: "text-purple-600"
  },
  {
    gradient: "from-pink-400 to-pink-500",
    text: "text-pink-600"
  },
  {
    gradient: "from-emerald-400 to-emerald-500",
    text: "text-emerald-600"
  },
  {
    gradient: "from-orange-400 to-orange-500",
    text: "text-orange-600"
  },
  {
    gradient: "from-cyan-400 to-cyan-500",
    text: "text-cyan-600"
  }
];

export default function ProjectCard({ 
  _id,
  name, 
  description, 
  coverImage,
  profileImage,
  category,
  chain,
  fundingSources,
  socialLinks,
  createdAt,
  amount = 0, 
  currency = 'ETH', 
  raised, 
  href = '#', 
  donors = 0,
  daysLeft = "Ongoing",
  index = 0
}: ProjectProps) {
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [donationAmount, setDonationAmount] = useState<number>(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Add effect to handle body scroll lock
  useEffect(() => {
    if (showConfirmModal || showDonateModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showConfirmModal, showDonateModal]);

  // Lấy index từ _id hoặc sử dụng hash function
  const getColorIndex = (_id?: string) => {
    if (!_id) return 0;
    // Use the first 6 characters of _id to generate a number
    const numericId = parseInt(_id.substring(0, 6), 16);
    return numericId % THEME_COLORS.length;
  };

  // Lấy màu gradient
  const getGradientColors = () => {
    return THEME_COLORS[getColorIndex(_id)].gradient;
  };

  // Lấy màu text
  const getTextColor = () => {
    return THEME_COLORS[getColorIndex(_id)].text;
  };

  return (
    <>
      <div className="block group">
        <div className="relative transform transition-all duration-300 hover:-translate-y-1">
          {/* Gradient border effect with dynamic colors */}
          <div className={`absolute -inset-0.5 bg-gradient-to-r ${getGradientColors()} rounded-2xl blur opacity-75 group-hover:opacity-100`}></div>
          
          <div className="relative bg-white rounded-2xl p-1">
            <div className="relative bg-white rounded-2xl overflow-hidden">
              {/* Header with dynamic text color */}
              <div className={`absolute top-0 left-0 right-0 flex justify-between items-center p-3 text-xs ${getTextColor()} font-medium z-10 bg-white/80 backdrop-blur-sm`}>
                <span>{category.toUpperCase()}</span>
                <span>#0{index < 10 ? `0${index}` : index}</span>
              </div>

              {/* Main image */}
              <Link href={href}>
                <div className="relative h-48">
                  <Image 
                    src={coverImage || '/images/placeholder.png'} 
                    alt={name}
                    fill
                    priority={index < 3}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </Link>

              {/* Content section */}
              <div className="p-4">
                <Link href={href}>
                  <h3 className="font-bold text-gray-800 mb-2">{name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {truncate(description, 100)}
                  </p>
                </Link>

                {/* Progress bar */}
                <div className="w-full h-2 bg-gray-100 rounded-full mb-3">
                  <div 
                    className={`h-full rounded-full bg-gradient-to-r ${getGradientColors()}`}
                    style={{ width: `${Math.min((amount / 100) * 100, 100)}%` }}
                  />
                </div>

                {/* Stats and Donate Button */}
                <div className="flex justify-between items-center text-sm">
                  <div>
                    <p className="font-bold text-gray-800">{amount} {currency}</p>
                    <p className="text-gray-500">{donors} contributors</p>
                  </div>
                  <button 
                    className="px-6 py-2.5 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
                    onClick={() => setShowDonateModal(true)}
                  >
                    Donate Now
                  </button>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-sm text-gray-600">Active</span>
                  </div>
                  <p className="text-sm text-gray-500">{daysLeft}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Donate Modal */}
      {showDonateModal && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowDonateModal(false);
            }
          }}
        >
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Donate</h2>
              <button 
                onClick={() => setShowDonateModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="mb-2">How do you want to donate?</p>
                <div className="space-y-2">
                  <label className="flex items-center p-3 border rounded-lg">
                    Direct donation
                  </label>
                </div>
              </div>

              <div>
                <p className="mb-2">Amount</p>
                <div className="flex border rounded-lg overflow-hidden">
                  <input 
                    type="number" 
                    className="flex-1 p-2 outline-none 
                      [&::-webkit-outer-spin-button]:appearance-none 
                      [&::-webkit-inner-spin-button]:appearance-none 
                      [&:-webkit-autofill]:bg-white
                      [-moz-appearance:textfield]"
                    placeholder="0"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(Number(e.target.value))}
                  />
                  <span className="bg-gray-50 px-3 py-2 text-gray-600 flex items-center">ETH</span>
                </div>
              </div>

              <button 
                className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                onClick={() => {
                  setShowDonateModal(false);
                  setShowConfirmModal(true);
                }}
              >
                Proceed to donate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Modal */}
      {showConfirmModal && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowConfirmModal(false);
            }
          }}
        >
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setShowConfirmModal(false);
                  setShowDonateModal(true);
                }}
              >
                ←
              </button>
              <h2 className="text-xl font-semibold">Confirm donation</h2>
              <button 
                onClick={() => setShowConfirmModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-gray-600">Total amount</p>
                <p className="text-lg font-semibold">{donationAmount} NEAR</p>
              </div>

              <div>
                <p className="text-gray-600 mb-2">Breakdown</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Protocol fee (2.5%)</span>
                    <span>{(donationAmount * 0.025).toFixed(3)} Ⓝ</span>
                  </div>
                  <div className="flex justify-between">
                    <span>On-Chain Storage</span>
                    <span>&lt;0.01 Ⓝ</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Project allocation (97.5%)</span>
                    <span>{(donationAmount * 0.975).toFixed(3)} Ⓝ</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="remove-fee" />
                <label htmlFor="remove-fee" className="text-sm text-gray-600">
                  Remove 2.5% protocol fee
                </label>
                <span className="text-sm text-gray-400">impact.sputnik-dao.near</span>
              </div>

              <button 
                className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                onClick={() => {
                  setShowConfirmModal(false);
                }}
              >
                Confirm donation
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 