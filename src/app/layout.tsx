import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'

import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Image Converter',
  description: 'Convert PNG images to WebP, ICO, or compress them',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}`}>
        {children}
        <Toaster richColors theme="light" position="bottom-center" />
      </body>
    </html>
  )
}
