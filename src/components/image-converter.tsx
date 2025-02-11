'use client'

import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ImageIcon, Loader } from 'lucide-react'
import { convertImage } from '@/lib/actions'
import { toast } from 'sonner'

enum ImageFormat {
  WebP = 'webp',
  WebPCompressed = 'webp-compressed',
  ICO = 'ico',
  PNGCompressed = 'png-compressed',
}

interface FileWithPreview extends File {
  preview?: string
}

export function ImageConverter() {
  const [file, setFile] = useState<FileWithPreview | null>(null)
  const [quality, setQuality] = useState(9)
  const [loading, setLoading] = useState(false)
  const [selectedFormat, setSelectedFormat] = useState<ImageFormat>(
    ImageFormat.WebP
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/png': ['.png'],
    },
    onDrop: (acceptedFiles) => {
      const selectedFile = acceptedFiles[0]
      if (selectedFile) {
        const fileWithPreview = Object.assign(selectedFile, {
          preview: URL.createObjectURL(selectedFile),
        })
        setFile(fileWithPreview)
      }
    },
    onDropRejected: (rejectedFiles) => {
      toast.warning('Invalid File Type', {
        description: 'Only PNG files are accepted.',
      })
    },
    noClick: false, // Allow clicking to open file explorer
    noKeyboard: false, // Allow keyboard navigation
  })

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedFile = e.target.files?.[0]
  //   if (selectedFile && selectedFile.type === 'image/png') {
  //     const fileWithPreview = Object.assign(selectedFile, {
  //       preview: URL.createObjectURL(selectedFile),
  //     })
  //     setFile(fileWithPreview)
  //   }
  // }

  const handleConvert = async (format: ImageFormat) => {
    if (!file) return

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('format', format)

      const adjustedQuality =
        format === ImageFormat.PNGCompressed ? Math.min(quality, 9) : quality
      formData.append('quality', adjustedQuality.toString())

      const blob = await convertImage(formData)

      // Create a download link
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `converted-image.${format === ImageFormat.ICO ? 'ico' : format.includes('webp') ? 'webp' : 'png'}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error converting image:', error)
      toast.error('Error', {
        description: 'Failed to convert image. Please try again.',
      })
    }
    setLoading(false)
  }

  const renderPreview = () => {
    if (file) {
      return (
        <div className="relative h-full w-full">
          <img
            src={file.preview || '/placeholder.svg'}
            alt="Preview"
            className="h-full w-full object-contain"
            onLoad={() => {
              if (file.preview) URL.revokeObjectURL(file.preview)
            }}
          />
        </div>
      )
    }
    return (
      <>
        <ImageIcon className="size-8 text-purple-200" />
        <p className="text-sm text-purple-200">
          Drag & drop or click to select a PNG image
        </p>
      </>
    )
  }

  const renderTabContent = (
    format: ImageFormat,
    description: string,
    showQualitySlider: boolean = false
  ) => {
    return (
      <TabsContent value={format}>
        <div className="space-y-4 pt-4">
          {showQualitySlider && (
            <div className="space-y-2">
              <p className="text-sm text-purple-300">
                Quality: {quality}
                {format === ImageFormat.WebPCompressed && '%'}
              </p>
              <Slider
                value={[quality]}
                onValueChange={(value) => setQuality(value[0])}
                min={1}
                max={format === ImageFormat.PNGCompressed ? 9 : 100}
                step={1}
              />
            </div>
          )}
          <p className="text-sm text-purple-300">{description}</p>
          <Button
            onClick={() => handleConvert(format)}
            disabled={!file || loading}
            className="w-full cursor-pointer"
          >
            {loading ? 'Converting...' : `Convert to ${format}`}
            {loading && <Loader className="mr-2 animate-spin" />}
          </Button>
        </div>
      </TabsContent>
    )
  }

  return (
    <Card className="z-50 border-none bg-zinc-700/60 shadow-2xl">
      <CardContent className="space-y-6 p-6">
        <div className="flex flex-col items-center gap-4">
          <div
            {...getRootProps()}
            className={`flex h-64 w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-indigo-200 ${
              isDragActive ? 'border-primary' : 'border-muted-foreground'
            } cursor-pointer transition-colors`}
          >
            <input {...getInputProps()} />
            {renderPreview()}
          </div>
        </div>

        <Tabs
          defaultValue={ImageFormat.WebP}
          className="w-full"
          onValueChange={(value) => setSelectedFormat(value as ImageFormat)}
        >
          <TabsList className="grid w-full grid-cols-4 bg-indigo-200">
            <TabsTrigger value="webp">WebP</TabsTrigger>
            <TabsTrigger value="webp-compressed">WebP Compressed</TabsTrigger>
            <TabsTrigger value="ico">ICO</TabsTrigger>
            <TabsTrigger value="png-compressed">PNG Compressed</TabsTrigger>
          </TabsList>
          {renderTabContent(
            ImageFormat.WebP,
            'Convert to WebP without compression'
          )}
          {renderTabContent(
            ImageFormat.WebPCompressed,
            'Convert to Compressed WebP',
            true
          )}
          {renderTabContent(ImageFormat.ICO, 'Convert to ICO format')}
          {renderTabContent(ImageFormat.PNGCompressed, 'Compress PNG', true)}
        </Tabs>
      </CardContent>
    </Card>
  )
}
