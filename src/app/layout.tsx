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
  keywords: [
    'image converter',
    'free image converter',
    'png converter',
    'PNG to WebP',
    'PNG to ICO',
    'compress PNG',
    'image optimization',
    'WebP converter',
    'ICO converter',
  ],
  authors: [
    {
      name: 'Adriel Gama',
      url: 'https://adrielgama.dev',
    },
  ],
  openGraph: {
    title: 'Image Converter',
    description:
      'Convert PNG images to WebP, ICO, or compress them with ease. A fast and simple tool for optimizing your images.',
    url: 'https://converter.adrielgama.dev',
    siteName: 'Image Converter',
    images: [
      {
        url: 'https://converter.adrielgama.dev/og/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Image Converter - Optimize Your Images',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Image Converter',
    description:
      'Convert PNG images to WebP, ICO, or compress them with ease. A fast and simple tool for optimizing your images.',
    images: ['https://imageconverter.com/twitter-image.png'],
  },
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
