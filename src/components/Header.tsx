import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50">
      <div className="container mx-auto h-[72px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1 pl-4">
          <span className="text-2xl font-bold tracking-tight uppercase">
            GrowX
          </span>
        </Link>
        <div className='flex items-center flex-row'>
          <nav className="hidden md:block flex-1 mr-16">
            <ul className="flex items-center">
              <li className="mr-12">
                <Link 
                  href="/" 
                  className="text-sm text-black flex items-center px-3 py-1.5 border border-[#eaeaea] rounded-full"
                >
                  <span className="mr-1.5">•</span>
                  Home
                </Link>
              </li>
              <li className="mr-12">
                <Link 
                  href="#how-it-works" 
                  className="text-sm text-gray-500 hover:text-black px-3 py-1.5 border border-[#eaeaea] rounded-full"
                >
                  How it works
                </Link>
              </li>
              <li className="mr-12">
                <Link 
                  href="#capabilities" 
                  className="text-sm text-gray-500 hover:text-black px-3 py-1.5 border border-[#eaeaea] rounded-full"
                >
                  Capabilities
                </Link>
              </li>
              <li>
                <Link 
                  href="#resources" 
                  className="text-sm text-gray-500 hover:text-black px-3 py-1.5 border border-[#eaeaea] rounded-full"
                >
                  Resource hub
                </Link>
              </li>
            </ul>
          </nav>
          <Button 
            variant="default" 
            className="bg-black text-white hover:bg-black/90 rounded-full text-[13px] font-medium px-5 h-9 mr-4"
          >
            GET QUOTE
          </Button>
        </div>
      </div>
    </header>
  )
}

