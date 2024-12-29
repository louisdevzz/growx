'use client'
import Header from '@/components/Header'
import { pots } from '@/data/pots'
import Link from 'next/link'


export default function PotsPage() {
  const activePots = pots.filter(pot => pot.status === 'active')
  const completedPots = pots.filter(pot => pot.status === 'completed')

  return (
    <div className="container min-h-screen">
      <Header />
      <main className="px-4 py-8">
        {/* Hero Section */}
        <div className="bg-[#FDF6F0] rounded-lg p-8 mb-12">
          <h1 className="text-3xl font-bold mb-2">Donate to Matching Rounds</h1>
          <p className="text-xl mb-4">to Get Your Contributions Amplified.</p>
          <button className="bg-red-500 text-white px-6 py-2 rounded-md">
            Learn More
          </button>
        </div>

        {/* Active Pots Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Active Funding Rounds <span className="text-gray-500">{activePots.length}</span></h2>
            <div className="flex gap-4">
              <button className="border px-4 py-2 rounded-md flex items-center gap-2">
                Filter <span>↓</span>
              </button>
              <button className="border px-4 py-2 rounded-md flex items-center gap-2">
                Sort <span>↓</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activePots.map((pot, index) => (
              <div className="block group" key={pot.id}>
                <div className="relative transform transition-all duration-300 hover:-translate-y-1">
                  {/* Gradient border effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-red-500 rounded-2xl blur opacity-75 group-hover:opacity-100"></div>
                  
                  <div className="relative bg-white rounded-2xl p-1">
                    <div className="relative bg-white rounded-2xl overflow-hidden">
                      {/* Header */}
                      <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-3 text-xs text-red-600 font-medium z-10 bg-white/80 backdrop-blur-sm">
                        <span>FUNDING ROUND</span>
                        <span>#0{index < 10 ? `0${index + 1}` : index + 1}</span>
                      </div>

                      {/* Content section */}
                      <div className="p-4 pt-12">
                        <Link href={`/funding-rounds/${pot.id}`}>
                          <h3 className="font-bold text-gray-800 mb-2">{pot.title}</h3>
                          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                            {pot.description}
                          </p>
                        </Link>

                        {/* Progress bar */}
                        <div className="w-full h-2 bg-gray-100 rounded-full mb-3">
                          <div 
                            className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-red-500"
                            // @ts-ignore
                            style={{ width: `${Math.min((pot.amount / pot.target) * 100, 100)}%` }}
                          />
                        </div>

                        {/* Stats */}
                        <div className="flex justify-between items-center text-sm">
                          <div>
                            <p className="font-bold text-gray-800">{pot.amount.toFixed(2)} ETH</p>
                            {/* @ts-ignore */}
                            <p className="text-gray-500">{pot.donors || 0} contributors</p>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            <span className="text-sm text-gray-600">Active</span>
                          </div>
                          <p className="text-sm text-gray-500">
                            {pot.daysLeft ? `${pot.daysLeft} days left` : 'Ongoing'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Completed Pots Section */}
        <div>
          <h2 className="text-xl font-semibold mb-6">
            Completed Funding Rounds <span className="text-gray-500">{completedPots.length}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedPots.map(pot => (
              <div key={pot.id} className="group">
                <div className="card-hover opacity-75">
                  <div className="card-hover-shake gradient-border"/>
                  
                  <h3 className="text-xl font-semibold mb-3">{pot.title}</h3>
                  <p className="text-gray-600 mb-6 text-sm">{pot.description}</p>
                  <div className="space-y-4">
                    <div className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent">
                      {pot.amount.toFixed(2)}Ⓝ <span className="text-gray-500 text-sm">raised</span>
                    </div>
                    <button className="w-full bg-gray-100 text-gray-800 py-2 rounded-md text-sm">
                      Project Completed
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
