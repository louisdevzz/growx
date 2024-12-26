import { Providers } from '@/components/provider'
import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'POTLOCK',
  description: 'Transforming Funding for Public Goods',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <Providers>{children}</Providers>
          <Toaster position="top-center" />
        </div>
      </body>
    </html>
  )
}
