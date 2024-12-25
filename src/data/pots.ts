export interface Donation {
  id: string
  donor: string
  amount: number
  date: string
}

export interface Pot {
  id: string
  title: string
  description: string
  amount: number
  donorsCount: number
  status: 'active' | 'completed'
  daysLeft?: number
  creator: string
  startDate: string
  endDate: string
  category: string
  recentDonations?: Donation[]
  topAllocations?: Array<{
    id: string
    rank: number
    name: string
    icon: string
    amount: number
  }>
}

export const pots: Pot[] = [
  {
    id: 'mp-retropgf',
    title: 'mpDAO RetroPGF',
    description: 'Retroactive round for Meta Pool ecosystem projects. Voting mechanism a mix of stake to vote + mpDAO core team judging.',
    amount: 418.40,
    donorsCount: 2,
    status: 'active',
    daysLeft: 12,
    creator: 'Meta Pool DAO',
    startDate: 'March 1, 2024',
    endDate: 'March 31, 2024',
    category: 'Ecosystem Growth',
    recentDonations: [
      {
        id: 'd1',
        donor: 'alice.near',
        amount: 50.0,
        date: '2 hours ago'
      },
      {
        id: 'd2',
        donor: 'bob.near',
        amount: 25.5,
        date: '5 hours ago'
      }
    ]
  },
  // Add more sample pots here...
] 