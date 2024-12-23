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
      <body>
        {children}
      </body>
    </html>
  )
}
