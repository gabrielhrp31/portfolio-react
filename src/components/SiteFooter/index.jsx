"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import OptimizedImage from "@/components/OptimizedImage";
import { buildMediaMap, DEFAULT_MEDIA } from "@/lib/media";
import { FooterWrapper } from "./styles";
import { useSiteSettings } from "@/components/SiteSettingsProvider";
import { formatFooterCopyright } from "@/lib/settings";

export default function SiteFooter() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const settings = useSiteSettings();
  const defaults = DEFAULT_MEDIA.logo_navbar;
  const [logoUrl, setLogoUrl] = useState(defaults.url);
  const [logoAlt, setLogoAlt] = useState(defaults.altText || "Logo");

  useEffect(() => {
    if (isAdmin) return undefined;
    let cancelled = false;

    fetch("/api/media")
      .then((r) => r.json())
      .then((data) => {
        if (cancelled || !Array.isArray(data)) return;
        const map = buildMediaMap(data);
        const next = map.logo_navbar || DEFAULT_MEDIA.logo_navbar;
        setLogoUrl(next.url);
        setLogoAlt(next.altText || "Logo");
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [isAdmin]);

  if (isAdmin) return null;

  return (
    <FooterWrapper>
      <div className="footer-inner">
        <div className="left">{formatFooterCopyright(settings)}</div>
        <div className="right">
          <div className="logo" aria-hidden="true">
            <OptimizedImage
              src={logoUrl}
              alt={logoAlt}
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
