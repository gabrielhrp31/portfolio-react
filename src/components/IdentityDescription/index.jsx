"use client";

import React from "react";
import OptimizedImage from "@/components/OptimizedImage";
import { mediaAlt, mediaUrl } from "@/lib/media";
import { useSiteSettings } from "@/components/SiteSettingsProvider";
import { settingValue } from "@/lib/settings";

function IdentityDescription({ media = null }) {
  const settings = useSiteSettings();

  return (
    <>
      <p className="text-and-image">
        <OptimizedImage
          src={mediaUrl(media, "id1")}
          alt={mediaAlt(media, "id1")}
          width={64}
          height={64}
          sizes="64px"
        />
        {settingValue(settings, "identity_caption_1")}
      </p>
      <p className="text-and-image">
        <OptimizedImage
          src={mediaUrl(media, "id3")}
          alt={mediaAlt(media, "id3")}
          width={64}
          height={64}
          sizes="64px"
        />
        {settingValue(settings, "identity_caption_2")}
      </p>
      <p className="text-and-image">
        <OptimizedImage
          src={mediaUrl(media, "id2")}
          alt={mediaAlt(media, "id2")}
          width={64}
          height={64}
          sizes="64px"
        />
        {settingValue(settings, "identity_caption_3")}
      </p>
    </>
  );
}

export default IdentityDescription;
