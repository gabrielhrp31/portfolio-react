import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { isAuthenticated } from "@/lib/auth";

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
  // Some browsers send empty type or application/octet-stream for camera rolls.
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
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    const safeName = sanitizeFilename(file.name);
    const filename = `${Date.now()}-${safeName}`;
    const dest = path.join(uploadsDir, filename);
    await fs.writeFile(dest, bytes);

    return NextResponse.json({ url: `/uploads/${filename}` }, { status: 201 });
  } catch (error) {
    console.error("Upload failed:", error);
    const code = error?.code || "";
    const message =
      code === "EACCES" || code === "EPERM"
        ? "Sem permissão para gravar em public/uploads (verifique o volume Docker)."
        : code === "ENOSPC"
          ? "Disco cheio — não foi possível salvar o upload."
          : "Falha ao enviar arquivo";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
