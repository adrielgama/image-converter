import { ImageConverter } from "@/components/image-converter";

export default function Home() {
  return (
    <main className="container mx-auto p-4 min-h-screen">
      <div className="max-w-3xl mx-auto space-y-6 py-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Image Converter</h1>
          <p className="text-muted-foreground">Convert PNG images to WebP, ICO, or compress them</p>
        </div>
        <ImageConverter />
      </div>
    </main>
  );
}
