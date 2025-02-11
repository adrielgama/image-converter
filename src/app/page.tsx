import { ImageConverter } from '@/components/image-converter'
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation'
import { Coffee } from 'lucide-react'
import Link from 'next/link'
import Script from 'next/script'

export default function Home() {
  return (
    <BackgroundGradientAnimation>
      <main className="absolute inset-0 z-50 container mx-auto flex min-h-screen items-center justify-center">
        <div className="mx-auto max-w-3xl space-y-6 py-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-white">Image Converter</h1>
            <p className="text-muted-foreground text-zinc-300">
              Convert PNG images to WebP, ICO, or compress them
            </p>
          </div>
          <ImageConverter />
        </div>
      </main>
      <footer className="absolute right-0 bottom-0 left-0 z-50 flex items-center justify-center p-4">
        <Link
          href="https://www.buymeacoffee.com/adrielgama"
          aria-label="Buy me a coffee"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg transition-colors hover:bg-[#FFCC00]/90"
        >
          <span>Buy me a coffee</span>
          <Coffee size={18} />
        </Link>
      </footer>
    </BackgroundGradientAnimation>
  )
}
