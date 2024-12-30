"use client"

import Header from '@/components/Header'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface User {
  id: string;
  name: string;
  imageUrl: string;
  bio: string;
  totalDonated: number;
  projectsCount: number;
}

// Dữ liệu mẫu
const sampleUsers: User[] = [
  {
    id: "1",
    name: "Rhyme Taylor",
    imageUrl: "/assets/investors/avt.jpg",
    bio: "Helping creatives build...",
    totalDonated: 2033.79,
    projectsCount: 5
  },
  {
    id: "2", 
    name: "nearbigbrain",
    imageUrl: "/assets/investors/avt.jpg",
    bio: "Web3 Developer",
    totalDonated: 3744.00,
    projectsCount: 3
  },
  {
    id: "3",
    name: "Illia",
    imageUrl: "/assets/investors/avt.jpg",
    bio: "Bringing 1B users to...",
    totalDonated: 1747.20,
    projectsCount: 2
  }
]

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(sampleUsers)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Community Members</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {users.map((user) => (
            <Link href={`/users/${user.id}`} key={user.id}>
              <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={user.imageUrl} 
                    alt={user.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{user.name}</h3>
                    <p className="text-gray-600 text-sm">{user.bio}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-600">Total Donated</p>
                    <p className="font-semibold">${user.totalDonated.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-600">Projects</p>
                    <p className="font-semibold">{user.projectsCount}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
