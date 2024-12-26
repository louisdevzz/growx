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
      <body>
        <Providers>{children}</Providers>
        <Toaster position="top-center" />
      </body>
    </html>
  )
}
