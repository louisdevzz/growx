import { Providers } from '@/components/provider'
import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import { Space_Grotesk } from 'next/font/google'
import { Analytics } from "@vercel/analytics/react"

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HOPEFUND - Web3 Crowdfunding Platform',
  description: 'Empowering Global Impact Through Web3 | Secure, transparent, and decentralized crowdfunding platform for meaningful projects worldwide',
  keywords: 'Web3, Crowdfunding, Blockchain, Cryptocurrency, Decentralized Finance, DeFi, Social Impact, Fundraising',
  authors: [{ name: 'HOPEFUND Team' }],
  manifest: '/manifest.json',
  openGraph: {
    title: 'HOPEFUND - Web3 Crowdfunding Platform',
    description: 'Empowering Global Impact Through Web3 | Secure, transparent, and decentralized crowdfunding platform',
    url: 'https://hopefund-gg.vercel.app',
    siteName: 'HOPEFUND',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'HOPEFUND Platform Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HOPEFUND - Web3 Crowdfunding Platform',
    description: 'Empowering Global Impact Through Web3 | Secure, transparent, and decentralized crowdfunding platform',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://hopefund-gg.vercel.app'
  },
  metadataBase: new URL('https://hopefund-gg.vercel.app')
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://hopefund-gg.vercel.app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
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