"use client";

import Image from 'next/image'
import Link from 'next/link';
import { useState, useEffect } from 'react';
// import { FundingBox } from './FundingBox';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  amount: number;
  currency: string;
  raised?: boolean;
  href: string;
  donors?: number;
}

const truncate = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

export default function ProjectCard({ title, description, image, tags, amount: initialAmount, currency, raised, href, donors = 0 }: ProjectCardProps) {
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

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showConfirmModal, showDonateModal]);

  return (
    <>
      <Link href={href} className="block">
        <div className="rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer max-h-[430px] shadow-lg">
          <div className="relative">
            <Image 
              src={image} 
              alt={title} 
              width={500}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-white/90 rounded-full text-sm font-medium">
                {tags[0]}
              </span>
            </div>
            {/* <div className="absolute -bottom-6 left-2">
              <Image 
                src={image} 
                alt={title} 
                width={100}
                height={100}
                className="rounded-full w-[50px] h-[50px] object-cover border-2 border-white"
              />
            </div> */}
          </div>
          
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="text-gray-600 text-sm mt-2">{truncate(description, 80)}</p>
              </div>
            </div>

            <div className="mt-4 bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-bold">~${donationAmount.toFixed(2)}</p>
                  <p className="text-xs text-gray-600">
                    Raised from {donors} donors
                  </p>
                </div>
                <button 
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowDonateModal(true);
                  }}
                >
                  Donate
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>

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
                  <label className="flex items-center p-3 border rounded-lg ">
                    
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
                  <span className="bg-gray-50 px-3 py-2 text-gray-600 flex items-center">NEAR</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button 
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
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
        </div>
      )}

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
              <button className="text-gray-500 hover:text-gray-700"
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
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
                onClick={() => {
                  // Xử lý logic xác nhận donate ở đây
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