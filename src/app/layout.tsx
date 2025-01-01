import { Providers } from '@/components/provider'
import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import { Space_Grotesk } from 'next/font/google'
import { Analytics } from "@vercel/analytics/react"


const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HOPEFUND',
  description: 'Empowering Global Impact Through Web3',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`min-h-screen bg-white ${spaceGrotesk.className}`}>
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <Providers>{children}</Providers>
          <Toaster position="top-center" />
          <Analytics />
        </div>
      </body>
    </html>
  )
}
