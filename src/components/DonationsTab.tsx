'use client'

import { useState } from 'react'
import { donations } from '@/data/donations'

export default function DonationsTab() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredDonations = donations.filter(donation =>
    donation.donor.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donation.project.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">All donations <span className="text-gray-500 text-sm ml-2">{donations.length}</span></h2>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search donations"
          className="w-full px-4 py-2 border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Donor</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Project</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Amount</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredDonations.map(donation => (
              <tr key={donation.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <img src={donation.donor.avatar} alt="" className="w-8 h-8 rounded-full" />
                    <span className="text-sm">{donation.donor.id}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <img src={donation.project.icon} alt="" className="w-6 h-6 rounded-full" />
                    <span className="text-sm">{donation.project.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium">ETH</span>
                    <span className="text-sm">{donation.amount.toFixed(2)}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{donation.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 