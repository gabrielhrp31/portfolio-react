import { NextResponse } from "next/server";
import { getUploadedFileWithData } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(_request, { params }) {
  try {
    const id = Number(params.id);
    if (!Number.isFinite(id) || id <= 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const file = await getUploadedFileWithData(id);
    if (!file?.data) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const body = Buffer.isBuffer(file.data)
      ? file.data
      : Buffer.from(file.data);

    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": file.mimeType || "application/octet-stream",
        "Content-Length": String(body.length),
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Disposition": `inline; filename="${String(file.filename).replace(
          /"/g,
          ""
        )}"`,
      },
    });
  } catch (error) {
    console.error("Failed to serve upload:", error);
    return NextResponse.json(
      { error: "Failed to load file" },
      { status: 500 }
    );
  }
}
