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
    <div className={cn("w-full", className)}>
      <div className="grid grid-cols-[auto_1fr_auto_auto] gap-4 px-6 py-3 text-sm text-gray-600 font-medium">
        <div>Rank</div>
        <div>Donor</div>
        <div>Amount</div>
        <div>Amount (USD)</div>
      </div>
      {donors.map((donor) => (
        <div 
          key={donor.rank}
          className="grid grid-cols-[auto_1fr_auto_auto] gap-4 px-6 py-4 hover:bg-gray-50 items-center"
        >
          <div className="text-sm">#{donor.rank}</div>
          <div className="flex items-center gap-3">
            <img src={donor.imageUrl} alt={donor.name} className="w-8 h-8 rounded-full" />
            <span>{donor.name}</span>
          </div>
          <div className="text-sm">{donor.tokenAmount.toFixed(2)}</div>
          <div className="text-sm">~${donor.amount.toLocaleString()}</div>
        </div>
      ))}
    </div>
  )
} 