import { NextRequest, NextResponse } from "next/server";
import { convertImage } from "@/lib/actions";

export const config = {
  runtime: "nodejs",
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const format = formData.get("format") as string;
    const quality = Number(formData.get("quality") || 80);

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const imageBlob = await convertImage(formData);

    return new NextResponse(imageBlob, {
      headers: {
        "Content-Type": format === "ico" ? "image/x-icon" : format.includes("webp") ? "image/webp" : "image/png",
        "Content-Disposition": `attachment; filename=converted.${format === "ico" ? "ico" : format.includes("webp") ? "webp" : "png"}`,
      },
    });
  } catch (error) {
    console.error("Error converting image:", error);
    return NextResponse.json({ error: "Failed to convert image" }, { status: 500 });
  }
}
