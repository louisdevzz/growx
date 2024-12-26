'use client'

import { useEffect, useState } from 'react'

interface Stage {
  name: string
  isCompleted: boolean
  isActive: boolean
  endTime?: Date
}

export default function ProgressBar() {
  const [timeLeft, setTimeLeft] = useState('')

  // Set a specific end date (replace with your actual end date)
  const endDate = new Date()
  endDate.setDate(endDate.getDate() + 2) // This sets it 2 days from now
  endDate.setHours(endDate.getHours() + 12) // Add 12 hours
  endDate.setMinutes(endDate.getMinutes() + 7) // Add 7 minutes
  endDate.setSeconds(endDate.getSeconds() + 4) // Add 4 seconds

  const stages: Stage[] = [
    {
      name: "Applications round",
      isCompleted: true,
      isActive: false
    },
    {
      name: "Matching round",
      isCompleted: false,
      isActive: true,
      endTime: endDate
    },
    {
      name: "Challenge period",
      isCompleted: false,
      isActive: false
    },
    {
      name: "Payouts completed",
      isCompleted: false,
      isActive: false
    }
  ]

  useEffect(() => {
    const calculateTimeLeft = () => {
      const matchingStage = stages.find(stage => stage.name === "Matching round")
      if (!matchingStage?.endTime) return

      const difference = matchingStage.endTime.getTime() - new Date().getTime()
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((difference / 1000 / 60) % 60)
        const seconds = Math.floor((difference / 1000) % 60)

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`)
      }
    }

    // Calculate immediately and then every second
    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-8 py-3 relative">
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gray-300 -translate-y-1/2" />
          
          <div 
            className="absolute top-1/2 left-0 h-[2px] bg-green-500 -translate-y-1/2" 
            style={{ 
              width: `${(stages.filter(s => s.isCompleted).length / (stages.length - 1)) * 100}%`
            }} 
          />

          {stages.map((stage, index) => (
            <div 
              key={stage.name}
              className={`flex items-center gap-2 ${index === 1 ? 'flex-1' : 'w-auto'} relative z-10 bg-white`}
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center
                ${stage.isCompleted ? 'bg-green-500' : 'border-2'}
                ${stage.isActive ? 'border-green-500' : 'border-gray-300'}`}
              >
                {stage.isCompleted && (
                  <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className={stage.isActive ? 'text-black' : 'text-gray-500'}>
                {stage.name}
                {stage.isActive && timeLeft && (
                  <span className="text-red-500 ml-1">ends in {timeLeft}</span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 