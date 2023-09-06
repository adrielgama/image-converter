const formatFileSize = (size: number) => {
  const sizeKB = Math.round(size / 1024)
  if (sizeKB > 1024) {
    const sizeMB = Math.round((sizeKB / 1024) * 100) / 100
    return `${sizeMB} MB`
  }
  return `${sizeKB} KB`
}

async function convertToWebP(blob: Blob): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = function (event) {
      const img = new Image()
      img.src = event?.target?.result as string
      img.onload = function () {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.drawImage(img, 0, 0)
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(blob)
            } else {
              reject(new Error('Conversion to WebP failed'))
            }
          }, 'image/webp')
        }
      }
    }
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

export { formatFileSize, convertToWebP }
