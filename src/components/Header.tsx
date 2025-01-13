'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import WalletButton from '@/components/WalletButton'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProjectsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full border-b bg-white relative z-20">
      <div className="max-w-full mx-auto px-1 py-3">
        <div className="flex items-center justify-between w-full">
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
          <nav className="hidden custom:flex gap-10">
            {/* Projects Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProjectsDropdownOpen(!isProjectsDropdownOpen)}
                className="text-base font-medium text-gray-900 hover:text-gray-700 transition-colors flex items-center gap-1"
              >
                Projects
                <svg
                  className={`w-4 h-4 transition-transform ${isProjectsDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isProjectsDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border rounded-md shadow-lg py-1">
                  <Link
                    href="/projects"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProjectsDropdownOpen(false)}
                  >
                    All Projects
                  </Link>
                  <Link
                    href="/projects/me"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProjectsDropdownOpen(false)}
                  >
                    My Projects
                  </Link>
                </div>
              )}
            </div>
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
          <div className="hidden custom:flex">
            <WalletButton />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="custom:hidden p-2"
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
          <div className="custom:hidden absolute top-full left-0 right-0 bg-white border-b shadow-lg">
            <div className="px-4 py-3 space-y-4">
              <Link 
                href="/projects" 
                className="block text-base font-medium text-gray-900 hover:text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                All Projects
              </Link>
              <Link 
                href="/projects/my-projects" 
                className="block text-base font-medium text-gray-900 hover:text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                My Projects
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
