"use server"

import sharp from "sharp"
import pngToIco from "png-to-ico"

export async function convertImage(formData: FormData): Promise<Blob> {
  const file = formData.get("file") as File
  const format = formData.get("format") as string
  const quality = Number.parseInt(formData.get("quality") as string)

  if (!file) {
    throw new Error("No file provided")
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  let processedBuffer: Buffer

  try {
    // Configure Sharp with WebAssembly for better compatibility
    sharp.simd(false)

    switch (format) {
      case "webp":
        processedBuffer = await sharp(buffer).webp().toBuffer()
        break
      case "webp-compressed":
        processedBuffer = await sharp(buffer).webp({ quality }).toBuffer()
        break
      case "ico":
        const pngBuffer = await sharp(buffer).resize(256, 256).png().toBuffer();
          processedBuffer = await pngToIco(pngBuffer);
        // processedBuffer = await sharp(buffer).resize(256, 256).toFormat("ico").toBuffer()
        break
      case "png-compressed":
        processedBuffer = await sharp(buffer).png({ compressionLevel: quality }).toBuffer()
        break
      default:
        throw new Error("Unsupported format")
    }

    return new Blob([processedBuffer], {
      type: format === "ico" ? "image/x-icon" : format.includes("webp") ? "image/webp" : "image/png",
    })
  } catch (error) {
    console.error("Error converting image:", error)
    throw new Error("Failed to convert image")
  }
}

