'use client'

import { useState } from 'react'
import Link from 'next/link'
import WalletButton from '@/components/WalletButton'
import Image from 'next/image'
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-full border-b bg-white relative z-10">
      <div className="max-w-full mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center text-3xl font-bold gap-2 no-underline cursor-pointer transition-all duration-200"
          >
            <span className="text-[#4169E1]">
              GROWX
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-10">
            <Link 
              href="/projects" 
              className="text-base font-medium no-underline text-gray-900 hover:text-gray-700 transition-colors"
            >
              Projects
            </Link>
            <Link 
              href="/funding-rounds" 
              className="text-base font-medium no-underline text-gray-600 hover:text-gray-900 transition-colors"
            >
              Funding rounds
            </Link>
            <Link 
              href="/investors" 
              className="text-base font-medium no-underline text-gray-600 hover:text-gray-900 transition-colors"
            >
              Investors
            </Link>
          </nav>

          {/* Desktop Wallet Button */}
          <div className="hidden md:flex">
            <WalletButton />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b shadow-lg">
            <div className="px-4 py-3 space-y-4">
              <Link 
                href="/projects" 
                className="block text-base font-medium text-gray-900 hover:text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </Link>
              <Link 
                href="/funding-rounds" 
                className="block text-base font-medium text-gray-600 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                Funding rounds
              </Link>
              <Link 
                href="/investors" 
                className="block text-base font-medium text-gray-600 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                Investors
              </Link>
              <div className="pt-4">
                <WalletButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
