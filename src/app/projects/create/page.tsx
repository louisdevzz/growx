'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import { useAccount, useSimulateContract, useWriteContract, useWatchContractEvent } from 'wagmi'
import { parseEther } from 'viem'
import toast from 'react-hot-toast'

const contractAbi = [
  {
    name: 'createProject',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: '_name', type: 'string' },
      { name: '_description', type: 'string' },
      { name: '_goalAmount', type: 'uint256' }
    ],
    outputs: []
  }
] as const

export default function CreateProject() {
  const { address } = useAccount()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    goalAmount: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useSimulateContract({
    address: '0x47CdF15340B67857D56Da97E73A5ED13C0Ba6183',
    abi: contractAbi,
    functionName: 'createProject',
    args: formData.name && formData.description && formData.goalAmount 
      ? [formData.name, formData.description, parseEther(formData.goalAmount)]
      : undefined,
    query: {
      enabled: Boolean(formData.name && formData.description && formData.goalAmount)
    }
  })

  const { writeContract, isSuccess } = useWriteContract()

  // Watch for successful transaction
  useWatchContractEvent({
    address: '0x47CdF15340B67857D56Da97E73A5ED13C0Ba6183',
    abi: contractAbi,
    eventName: 'ProjectCreated',
    onLogs(logs) {
      setIsSubmitting(false)
      toast.success('Project created successfully!')
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!address) {
      toast.error('Please connect your wallet first')
      return
    }

    try {
      setIsSubmitting(true)
      const goalAmountInWei = parseEther(formData.goalAmount)
      
      writeContract({
        address: '0x47CdF15340B67857D56Da97E73A5ED13C0Ba6183',
        abi: contractAbi,
        functionName: 'createProject',
        args: [formData.name, formData.description, goalAmountInWei]
      })
    } catch (error) {
      console.error('Error creating project:', error)
      toast.error('Error creating project. Please try again.')
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    toast.success('Project created successfully!')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-2xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Create New Project</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Project Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-red-500 focus:outline-none focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-red-500 focus:outline-none focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label htmlFor="goalAmount" className="block text-sm font-medium text-gray-700">
              Goal Amount (ETH)
            </label>
            <input
              type="number"
              id="goalAmount"
              value={formData.goalAmount}
              onChange={(e) => setFormData(prev => ({ ...prev, goalAmount: e.target.value }))}
              step="0.000000000000000001"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-red-500 focus:outline-none focus:ring-red-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={!address || isSubmitting}
            className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating Project...' : 'Create Project'}
          </button>

          {!address && (
            <p className="text-sm text-gray-500 text-center">
              Please connect your wallet to create a project
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
