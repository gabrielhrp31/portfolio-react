"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Bookmark, SideNavWrapper } from "./styles";
import { useQuoteModal } from "@/components/Contact/QuoteModalContext";
import { useSiteSettings } from "@/components/SiteSettingsProvider";
import { settingValue } from "@/lib/settings";

function SideNav() {
  const [activeId, setActiveId] = useState("inicio");
  const { openModal } = useQuoteModal();
  const settings = useSiteSettings();

  const sections = useMemo(
    () => [
      {
        id: "inicio",
        label: settingValue(settings, "nav_inicio"),
        tone: "onDark",
      },
      {
        id: "sobre",
        label: settingValue(settings, "nav_sobre"),
        tone: "onGreen",
      },
      {
        id: "servicos",
        label: settingValue(settings, "nav_servicos"),
        tone: "onDark",
      },
      {
        id: "experiencia",
        label: settingValue(settings, "nav_experiencia"),
        tone: "onSurface",
      },
      {
        id: "cursos",
        label: settingValue(settings, "nav_cursos"),
        tone: "onSurface",
      },
      {
        id: "portfolio",
        label: settingValue(settings, "nav_portfolio"),
        tone: "onSurface",
      },
    ],
    [settings]
  );

  const quoteLabel = settingValue(settings, "nav_orcamento");
  const ctaLabel = settingValue(settings, "cta_quote_label");
  const activeTone =
    sections.find((section) => section.id === activeId)?.tone || "onSurface";

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean);

    if (!elements.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-30% 0px -40% 0px",
        threshold: [0.1, 0.25, 0.45, 0.65],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
  }

  return (
    <SideNavWrapper aria-label="Navegação por seções" data-tone={activeTone}>
      {sections.map((section) => (
        <Bookmark
          key={section.id}
          type="button"
          $active={activeId === section.id}
          $tone={activeTone}
          onClick={() => scrollToSection(section.id)}
          aria-current={activeId === section.id ? "true" : undefined}
        >
          <span className="bookmark__label">{section.label}</span>
          <span className="bookmark__notch" />
        </Bookmark>
      ))}
      <Bookmark
        type="button"
        $active={false}
        $tone={activeTone}
        onClick={() => openModal({ source: "sidenav" })}
        aria-label={ctaLabel}
      >
        <span className="bookmark__label">{quoteLabel}</span>
        <span className="bookmark__notch" />
      </Bookmark>
    </SideNavWrapper>
  );
}

export default SideNav;
