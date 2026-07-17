"use client";

import React, { useEffect, useState } from "react";
import { Bookmark, SideNavWrapper } from "./styles";
import { useQuoteModal } from "@/components/Contact/QuoteModalContext";

const SECTIONS = [
  { id: "inicio", label: "Início", tone: "onDark" },
  { id: "sobre", label: "Sobre", tone: "onGreen" },
  { id: "servicos", label: "Serviços", tone: "onDark" },
  { id: "experiencia", label: "Experiência", tone: "onSurface" },
  { id: "cursos", label: "Cursos", tone: "onSurface" },
  { id: "portfolio", label: "Portfólio", tone: "onSurface" },
];

function SideNav() {
  const [activeId, setActiveId] = useState("inicio");
  const { openModal } = useQuoteModal();
  const activeTone =
    SECTIONS.find((section) => section.id === activeId)?.tone || "onSurface";

  useEffect(() => {
    const elements = SECTIONS.map((section) =>
      document.getElementById(section.id)
    ).filter(Boolean);

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
  }, []);

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
  }

  return (
    <SideNavWrapper aria-label="Navegação por seções" data-tone={activeTone}>
      {SECTIONS.map((section) => (
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
        aria-label="Solicitar orçamento"
      >
        <span className="bookmark__label">Orçamento</span>
        <span className="bookmark__notch" />
      </Bookmark>
    </SideNavWrapper>
  );
}

export default SideNav;
