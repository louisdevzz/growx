import { Providers } from '@/components/provider'
import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import { Space_Grotesk } from 'next/font/google'
import { Analytics } from "@vercel/analytics/react"
import { Suspense } from 'react'
import LoadingSpinner from '@/components/LoadingSpinner'
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import './markdown.css';


const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GrowX - Web3 Crowdfunding Platform',
  description: 'Empowering Global Impact Through Web3 | Secure, transparent, and decentralized crowdfunding platform for meaningful projects worldwide',
  keywords: 'Web3, Crowdfunding, Blockchain, Cryptocurrency, Decentralized Finance, DeFi, Social Impact, Fundraising',
  authors: [{ name: 'GrowX Team' }],
  manifest: '/manifest.json',
  openGraph: {
    title: 'GrowX - Web3 Crowdfunding Platform',
    description: 'Empowering Global Impact Through Web3 | Secure, transparent, and decentralized crowdfunding platform',
    url: 'https://growx.top',
    siteName: 'GrowX',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GrowX Platform Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GrowX - Web3 Crowdfunding Platform',
    description: 'Empowering Global Impact Through Web3 | Secure, transparent, and decentralized crowdfunding platform',
    images: ['/og-image.png'],
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
    canonical: 'https://growx.top'
  },
  metadataBase: new URL('https://growx.top')
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://growx.top" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`min-h-screen bg-white ${spaceGrotesk.className}`}>
        <div className=" max-w-full px-1 sm:px-1 lg:px-1">
          <Providers>
            <Suspense fallback={<LoadingSpinner />}>
              {children}
            </Suspense>
          </Providers>
          <Toaster position="top-center" />
          <Analytics />
        </div>
      </body>
    </html>
  )
}