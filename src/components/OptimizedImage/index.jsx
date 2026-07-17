"use client";

import Image from "next/image";
import { isLocalMediaSrc, normalizeMediaSrc } from "@/lib/media";

/**
 * Wrapper around next/image with AVIF/WebP for local assets.
 * Remote URLs stay configurable but skip the optimizer (no hostname allowlist).
 */
export default function OptimizedImage({
  src,
  alt = "",
  width,
  height,
  fill = false,
  sizes,
  className,
  style,
  priority = false,
  quality = 80,
  objectFit,
}) {
  const resolved = normalizeMediaSrc(src);
  if (!resolved) return null;

  const local = isLocalMediaSrc(resolved);
  // DB-backed uploads (/api/uploads/:id) and SVGs skip the optimizer.
  const unoptimized =
    !local ||
    resolved.endsWith(".svg") ||
    resolved.startsWith("/api/uploads/");
  const mergedStyle =
    objectFit && fill
      ? { objectFit, ...style }
      : objectFit
        ? { objectFit, width: "100%", height: "100%", ...style }
        : style;

  const safeAlt = alt ?? "";

  if (fill) {
    return (
      <Image
        src={resolved}
        alt={safeAlt}
        className={className}
        style={mergedStyle}
        priority={priority}
        quality={quality}
        unoptimized={unoptimized}
        fill
        sizes={sizes || "100vw"}
      />
    );
  }

  return (
    <Image
      src={resolved}
      alt={safeAlt}
      className={className}
      style={mergedStyle}
      priority={priority}
      quality={quality}
      unoptimized={unoptimized}
      width={width || 800}
      height={height || 600}
      sizes={sizes}
    />
  );
}
