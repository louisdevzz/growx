import Link from 'next/link'
import WalletButton from '@/components/WalletButton'
import Image from 'next/image'
export default function Header() {
  return (
    <div className="w-full border-b bg-white relative z-10">
      <div className="max-w-full mx-auto px-6 py-3 flex items-center justify-between">
        <Link 
            href="/" 
            className="flex items-center text-3xl font-bold gap-2 no-underline cursor-pointer transition-all duration-200 relative z-10"
          >
            <span className="text-[#4169E1]">
                GROWX
            </span>
        </Link>
        <nav className="flex gap-10 absolute left-1/2 -translate-x-1/2 md:gap-4 sm:order-3 sm:w-full sm:justify-center z-0 items-center">
          <Link 
            href="/projects" 
            className="text-base font-medium no-underline text-gray-900 hover:text-gray-700 transition-colors relative z-10"
          >
            Projects
          </Link>
          {/* <Link 
            href="/feed" 
            className="text-sm font-medium no-underline text-gray-600 hover:text-gray-900 transition-colors relative z-10"
          >
            Feed
          </Link> */}
          <Link 
            href="/funding-rounds" 
            className="text-base font-medium no-underline text-gray-600 hover:text-gray-900 transition-colors relative z-10"
          >
            Funding rounds
          </Link>
          <Link 
            href="/investors" 
            className="text-base font-medium no-underline text-gray-600 hover:text-gray-900 transition-colors relative z-10"
          >
            Investors
          </Link>
        </nav>
        <div className="flex gap-3 sm:gap-2 relative z-10">
          <WalletButton />
        </div>
      </div>
    </div>
  )
}
