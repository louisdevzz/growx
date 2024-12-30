'use client'

import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import { useCallback, useEffect, useState } from 'react'
import { User } from '@/data/users'
import { users } from '@/data/users'
import Link from 'next/link'

const UserDetail = () => {
  const params = useParams()
  console.log("URL params:", params)
  const name = params?.name as string
  console.log("Looking for user:", name)
  
  const [activeTab, setActiveTab] = useState<string>('overview')
  const [user, setUser] = useState<User | null>(null)

  const fetchUser = useCallback(async () => {
    if (!name) return
    
    const decodedName = decodeURIComponent(name)
    console.log("Decoded name:", decodedName)
    const userData = users.find(u => u.name === decodedName)
    console.log("Found user:", userData)
    if (userData) {
      setUser(userData)
    }
  }, [name])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">User not found</h2>
          <p className="text-gray-600">The user you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-[1440px] mx-auto px-4 py-8">
        {/* Cover Image */}
        <div className="relative w-full h-[300px] rounded-lg overflow-hidden mb-6">
          <img 
            src={user.coverImage} 
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="flex items-start gap-6 -mt-16 relative z-10 mb-8">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white bg-white shadow-lg">
            <img 
              src={user.profileImage} 
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-16">
            <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
            <p className="text-gray-600 font-mono mb-2">{user.walletAddress}</p>
            <div className="flex items-center gap-2">
              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-sm">
                Rank #{user.rank || 'N/A'}
              </span>
              <span className="text-gray-600">
                ${user.donations.amount.toLocaleString()} donated
              </span>
            </div>
          </div>
        </div>

        {/* Bio & Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p className="text-gray-600 mb-6">{user.bio}</p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">Location</h3>
                  <p className="text-gray-600">{user.address}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Social Links</h3>
                  <div className="flex gap-3">
                    {user.socialLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {link.type}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Donation Stats */}
          <div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Donation Stats</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600">Total Amount</p>
                  <p className="text-2xl font-bold">${user.donations.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Tokens Earned</p>
                  <p className="text-2xl font-bold">{user.donations.tokenAmount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDetail 