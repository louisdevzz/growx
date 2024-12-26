import Image from 'next/image'
import { cn } from '@/lib/utils'

interface DonorCardProps {
  rank: number
  name: string
  amount: number
  imageUrl: string
  description?: string
  isHighlighted?: boolean
}

export default function DonorCard({ rank, name, amount, imageUrl, description, isHighlighted }: DonorCardProps) {
  return (
    <div className={cn(
      "bg-white rounded-lg p-6 shadow-sm relative",
      isHighlighted && "border-2 border-primary"
    )}>
      {isHighlighted && (
        <div className="absolute top-2 right-2">
          <span className="text-yellow-400">👑</span>
        </div>
      )}
      <div className="absolute top-2 right-2 text-sm text-gray-500">#{rank}</div>
      <div className="flex flex-col items-center gap-4">
        <Image
          src={imageUrl}
          alt={name}
          width={80}
          height={80}
          className="rounded-full"
        />
        <div className="text-center">
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <div className="bg-gray-100 px-4 py-2 rounded-full">
          ~${amount.toLocaleString()} Donated
        </div>
      </div>
    </div>
  )
} 