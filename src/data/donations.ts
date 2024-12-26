export interface Donation {
  id: string
  donor: {
    id: string
    avatar: string
  }
  project: {
    id: string
    name: string
    icon: string
  }
  amount: number
  date: string
}

export const donations: Donation[] = [
  {
    id: '1',
    donor: {
      id: 'a0824e3043',
      avatar: 'https://i.near.social/magic/thumbnail/https://near.social/magic/img/account/cryptobrunchlatam.near'
    },
    project: {
      id: '1',
      name: 'cryptobrun',
      icon: 'https://i.near.social/magic/thumbnail/https://near.social/magic/img/account/cryptobrunchlatam.near'
    },
    amount: 1.00,
    date: '6 days ago'
  },
  {
    id: '2',
    donor: {
      id: 'e5fb81d596',
      avatar: 'https://i.near.social/magic/thumbnail/https://near.social/magic/img/account/cryptobrunchlatam.near'
    },
    project: {
      id: '2',
      name: 'cryptobrun',
      icon: 'https://i.near.social/magic/thumbnail/https://near.social/magic/img/account/cryptobrunchlatam.near'
    },
    amount: 0.50,
    date: '9 days ago'
  },
  // Add more sample donations as needed
] 