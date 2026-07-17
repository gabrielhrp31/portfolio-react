import { NextResponse } from "next/server";
import path from "path";
import { isAuthenticated } from "@/lib/auth";
import { createUploadedFile } from "@/lib/db";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
  "image/svg+xml",
]);

const EXT_TO_MIME = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};

const MAX_BYTES = 8 * 1024 * 1024;

function sanitizeFilename(name) {
  return (
    String(name || "upload")
      .normalize("NFKD")
      .replace(/[^\w.\-]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 80)
      .toLowerCase() || "upload"
  );
}

function resolveMimeType(file) {
  const reported = String(file.type || "").toLowerCase();
  if (ALLOWED_TYPES.has(reported)) return reported;
  const ext = path.extname(String(file.name || "")).toLowerCase();
  return EXT_TO_MIME[ext] || "";
}

export async function POST(request) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "file is required" }, { status: 400 });
    }

    const mime = resolveMimeType(file);
    if (!mime) {
      return NextResponse.json(
        {
          error:
            "Tipo de arquivo não suportado. Use JPG, PNG, WebP, AVIF, GIF ou SVG.",
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: "Arquivo muito grande (máx. 8MB)" },
        { status: 400 }
      );
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const filename = sanitizeFilename(file.name);
    const saved = await createUploadedFile({
      filename,
      mimeType: mime,
      data: bytes,
    });

    // URL is served by GET /api/uploads/:id (MySQL-backed — no Docker volume needed).
    return NextResponse.json(
      { url: saved.url, id: saved.id, filename: saved.filename },
      { status: 201 }
    );
  } catch (error) {
    console.error("Upload failed:", error);
    const message =
      error?.code === "ER_NO_SUCH_TABLE"
        ? "Tabela uploaded_files ausente — rode o seed/deploy novamente."
        : "Falha ao enviar arquivo";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
