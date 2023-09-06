import React from 'react'

import JSZip from 'jszip'
import { DownloadIcon } from '@radix-ui/react-icons'

import { Separator } from '@/components/ui/separator'

import { FileDetails, ListItemsProps } from '@/types'
import { convertToWebP, formatFileSize } from '@/utils'

export const ListItems: React.FC<ListItemsProps> = ({
  uploadedFiles,
  size,
}) => {
  if (size === 0) return null

  const handleDownload = async (file: FileDetails) => {
    try {
        const webpBlob = await convertToWebP(file.file);

      const zip = new JSZip()
      zip.file(`${file.name}.webp`, webpBlob, { binary: true })

      zip.generateAsync({ type: 'blob' }).then((blob) => {
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = url
        a.download = `${file.name}.zip`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      })
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  return (
    <div className="max-h-[120px] bg-gray-50 px-4 py-2 rounded-md overflow-y-auto">
      <ul>
        {uploadedFiles.map((file, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-row justify-between">
              <li className="text-xs">
                {file.name} ({file.type}, {formatFileSize(file.size)})
              </li>
              <DownloadIcon
                className="cursor-pointer hover:text-green-500 h-4 w-4 text-green-600"
                onClick={() => handleDownload(file)}
              />
            </div>
            <Separator className="my-2 last:hidden" />
          </React.Fragment>
        ))}
      </ul>
    </div>
  )
}
