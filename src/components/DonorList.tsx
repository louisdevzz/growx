import { cn } from '@/lib/utils'

export interface Donor {
  rank: number
  name: string
  amount: number
  imageUrl: string
  tokenAmount: number
}

interface DonorListProps {
  donors: Donor[]
  className?: string
}

export default function DonorList({ donors, className }: DonorListProps) {
  return (
    <div className={cn("w-full rounded-lg shadow-md bg-white", className)}>
      <div className="grid grid-cols-[auto_1fr_auto_auto] gap-4 px-6 py-4 text-sm font-semibold bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b">
        <div>Rank</div>
        <div>Donor</div>
        <div>Amount</div>
        <div>Amount (USD)</div>
      </div>
      {donors.map((donor) => (
        <div 
          key={donor.rank}
          className="grid grid-cols-[auto_1fr_auto_auto] gap-4 px-6 py-4 
            hover:bg-blue-50 transition-colors duration-200 items-center
            border-b last:border-b-0"
        >
          <div className="text-sm font-medium text-gray-600">#{donor.rank}</div>
          <div className="flex items-center gap-3">
            <img 
              src={donor.imageUrl} 
              alt={donor.name} 
              className="w-8 h-8 rounded-full ring-2 ring-offset-2 ring-blue-100 hover:ring-blue-300 transition-all duration-200" 
            />
            <span className="font-medium hover:text-blue-600 transition-colors duration-200">{donor.name}</span>
          </div>
          <div className="text-sm font-medium text-gray-700">{donor.tokenAmount.toFixed(2)}</div>
          <div className="text-sm font-medium text-emerald-600">~${donor.amount.toLocaleString()}</div>
        </div>
      ))}
    </div>
  )
} 