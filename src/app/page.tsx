import { ImageConverter } from '@/components/image-converter'
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation'

export default function Home() {
  return (
    <BackgroundGradientAnimation>
      {/* <main className="container mx-auto min-h-screen p-4"> */}
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
    </BackgroundGradientAnimation>
  )
}
