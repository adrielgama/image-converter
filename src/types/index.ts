interface FileDetails {
  name: string
  type: string
  size: number
  file: File | Blob
}

interface ListItemsProps {
  uploadedFiles: FileDetails[]
  size: number
}

export type { FileDetails, ListItemsProps }
