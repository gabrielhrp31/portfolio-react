"use client";

import React, { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import OptimizedImage from "@/components/OptimizedImage";
import { buildMediaMap, DEFAULT_MEDIA } from "@/lib/media";
import { FooterWrapper } from "./styles";

export default function SiteFooter() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const [mediaRows, setMediaRows] = useState([]);
  const mediaMap = useMemo(() => buildMediaMap(mediaRows), [mediaRows]);

  useEffect(() => {
    if (isAdmin) return undefined;
    let cancelled = false;

    fetch("/api/media")
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled && Array.isArray(data)) setMediaRows(data);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [isAdmin]);

  if (isAdmin) return null;

  const logo = mediaMap?.logo_navbar || DEFAULT_MEDIA.logo_navbar;

  return (
    <FooterWrapper>
      <div className="footer-inner">
        <div className="left">
          © {new Date().getFullYear()} Gabriel Rodrigues. Todos os direitos
          reservados.
        </div>
        <div className="right">
          <div className="logo" aria-hidden="true">
            <OptimizedImage
              src={logo.url}
              alt={logo.altText || "Logo"}
              width={160}
              height={44}
              sizes="160px"
              quality={90}
              priority={false}
              style={{ height: "100%", width: "auto" }}
            />
          </div>
        </div>
      </div>
    </FooterWrapper>
  );
}
