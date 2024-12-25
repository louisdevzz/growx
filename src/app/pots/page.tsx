import Header from '@/components/Header'
import { pots } from '@/data/pots'
import Link from 'next/link'

export default function PotsPage() {
  const activePots = pots.filter(pot => pot.status === 'active')
  const completedPots = pots.filter(pot => pot.status === 'completed')

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
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
            <h2 className="text-xl font-semibold">Active Pots <span className="text-gray-500">{activePots.length}</span></h2>
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
            {activePots.map(pot => (
              <Link href={`/pots/${pot.id}`} className="block">
                <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-3">{pot.title}</h3>
                  <p className="text-gray-600 mb-6 text-sm">{pot.description}</p>
                  <div className="space-y-4">
                    <div className="text-2xl font-bold">
                      {pot.amount.toFixed(2)}Ⓝ <span className="text-gray-500 text-sm">raised</span>
                    </div>
                    {pot.daysLeft && (
                      <div className="flex items-center gap-2">
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          {pot.daysLeft} days left to donate
                        </span>
                      </div>
                    )}
                    <button className="w-full bg-green-100 text-green-800 py-2 rounded-md text-sm">
                      I want to donate
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Completed Pots Section */}
        <div>
          <h2 className="text-xl font-semibold mb-6">
            Completed Pots <span className="text-gray-500">{completedPots.length}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedPots.map(pot => (
              <div key={pot.id} className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">{pot.title}</h3>
                <p className="text-gray-600 mb-6 text-sm">{pot.description}</p>
                <div className="space-y-4">
                  <div className="text-2xl font-bold">
                    {pot.amount.toFixed(2)}Ⓝ <span className="text-gray-500 text-sm">raised</span>
                  </div>
                  <button className="w-full bg-gray-100 text-gray-800 py-2 rounded-md text-sm">
                    Project Completed
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
