"use client";

import React from "react";
import { usePathname } from "next/navigation";
import OptimizedImage from "@/components/OptimizedImage";
import { DEFAULT_MEDIA } from "@/lib/media";
import { FooterWrapper } from "./styles";
import { useSiteSettings } from "@/components/SiteSettingsProvider";
import { formatFooterCopyright } from "@/lib/settings";

export default function SiteFooter({
  logoUrl = DEFAULT_MEDIA.logo_navbar.url,
  logoAlt = DEFAULT_MEDIA.logo_navbar.altText || "Logo",
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const settings = useSiteSettings();

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
