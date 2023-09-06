import { ChangeEvent, useState } from 'react'

import { Input } from '@/components/ui/input'
import { FileDetails } from '@/types'
import { ListItems } from './ListItems'

export function InputFile() {
  const [uploadedFiles, setUploadedFiles] = useState<FileDetails[]>([])

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (!files) return

    if (files.length > 3) {
      alert('You can only upload a maximum of 3 files')
      return
    }

    const newFiles: FileDetails[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const fileType = file.name.split('.').pop()?.toLowerCase()

      if (fileType !== 'jpg' && fileType !== 'jpeg' && fileType !== 'png') {
        alert('Only jpg, jpeg, and png files are allowed.')
        return
      }

      newFiles.push({ name: file.name, type: fileType || '', size: file.size, file })
    }

    setUploadedFiles(newFiles)
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Input
        id="picture"
        type="file"
        multiple
        accept=".jpg,.jpeg,.png"
        onChange={handleFileChange}
      />
      <ListItems uploadedFiles={uploadedFiles} size={uploadedFiles.length} />
    </div>
  )
}
