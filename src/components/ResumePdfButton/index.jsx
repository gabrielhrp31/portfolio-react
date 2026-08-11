"use client";

import React from "react";
import { FaFilePdf } from "react-icons/fa";
import Magnet from "@/components/react-bits/Magnet";
import { useSiteSettings } from "@/components/SiteSettingsProvider";
import { settingValue } from "@/lib/settings";

export default function ResumePdfButton({ className = "" }) {
  const settings = useSiteSettings();
  const label = settingValue(
    settings,
    "cta_resume_pdf_label",
    "Baixar currículo PDF"
  );

  return (
    <Magnet padding={12} magnetStrength={2.5}>
      <a
        className={`resume-pdf-btn ${className}`.trim()}
        href="/api/resume/pdf"
        download
        target="_blank"
        rel="noreferrer"
      >
        <FaFilePdf aria-hidden size={18} />
        <span>{label}</span>
      </a>
    </Magnet>
  );
}
