"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageIcon } from "lucide-react"
import { convertImage } from "@/lib/actions"
import { toast } from "sonner"

interface FileWithPreview extends File {
  preview?: string
}

export function ImageConverter() {
  const [file, setFile] = useState<FileWithPreview | null>(null)
  const [quality, setQuality] = useState(9)
  const [loading, setLoading] = useState(false)
  const [selectedFormat, setSelectedFormat] = useState<"webp" | "webp-compressed" | "ico" | "png-compressed">("webp");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === "image/png") {
      const fileWithPreview = Object.assign(selectedFile, {
        preview: URL.createObjectURL(selectedFile),
      })
      setFile(fileWithPreview)
    }
  }

  const handleConvert = async (format: "webp" | "webp-compressed" | "ico" | "png-compressed") => {
    if (!file) return

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("format", format)

      const adjustedQuality = format === "png-compressed" ? Math.min(quality, 9) : quality;
      formData.append("quality", adjustedQuality.toString());

      const blob = await convertImage(formData)

      // Create a download link
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `converted-image.${format === "ico" ? "ico" : format.includes("webp") ? "webp" : "png"}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error converting image:", error)
      toast.error("Error", {
        description: "Failed to convert image. Please try again.",
      })
    }
    setLoading(false)
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="flex flex-col items-center gap-4">
          <div
            className={`w-full h-64 border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-2 ${
              file ? "border-primary" : "border-muted-foreground"
            }`}
          >
            {file ? (
              <div className="relative w-full h-full">
                <img
                  src={file.preview || "/placeholder.svg"}
                  alt="Preview"
                  className="w-full h-full object-contain"
                  onLoad={() => {
                    if (file.preview) URL.revokeObjectURL(file.preview)
                  }}
                />
              </div>
            ) : (
              <>
                <ImageIcon className="w-8 h-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Drag & drop or click to select a PNG image</p>
              </>
            )}
            <input
              type="file"
              accept="image/png"
              onChange={handleFileChange}
              className="absolute opacity-0 cursor-pointer"
            />
          </div>
        </div>

        <Tabs defaultValue="webp" className="w-full" onValueChange={(value) => setSelectedFormat(value as any)}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="webp">WebP</TabsTrigger>
            <TabsTrigger value="webp-compressed">WebP Compressed</TabsTrigger>
            <TabsTrigger value="ico">ICO</TabsTrigger>
            <TabsTrigger value="png-compressed">PNG Compressed</TabsTrigger>
          </TabsList>
          <TabsContent value="webp">
            <div className="space-y-4 pt-4">
              <p className="text-sm text-muted-foreground">Convert to WebP without compression</p>
              <Button onClick={() => handleConvert("webp")} disabled={!file || loading} className="w-full">
                {loading ? "Converting..." : "Convert to WebP"}
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="webp-compressed">
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Quality: {quality}%</p>
                <Slider value={[quality]} onValueChange={(value) => setQuality(value[0])} min={1} max={100} step={1} />
              </div>
              <Button onClick={() => handleConvert("webp-compressed")} disabled={!file || loading} className="w-full">
                {loading ? "Converting..." : "Convert to Compressed WebP"}
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="ico">
            <div className="space-y-4 pt-4">
              <p className="text-sm text-muted-foreground">Convert to ICO format</p>
              <Button onClick={() => handleConvert("ico")} disabled={!file || loading} className="w-full">
                {loading ? "Converting..." : "Convert to ICO"}
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="png-compressed">
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Quality: {quality}%</p>
                <Slider value={[quality]} onValueChange={(value) => setQuality(value[0])} min={1} max={selectedFormat === "png-compressed" ? 9 : 100} step={1} />
              </div>
              <Button onClick={() => handleConvert("png-compressed")} disabled={!file || loading} className="w-full">
                {loading ? "Converting..." : "Compress PNG"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

