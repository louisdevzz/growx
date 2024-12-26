import './globals.css'
import type { Metadata } from 'next'

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
          {children}
        </div>
      </body>
    </html>
  )
}
