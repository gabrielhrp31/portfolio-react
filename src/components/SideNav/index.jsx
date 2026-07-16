"use client";

import React, { useEffect, useState } from "react";
import { Bookmark, SideNavWrapper } from "./styles";

const SECTIONS = [
  { id: "inicio", label: "Início" },
  { id: "sobre", label: "Sobre" },
  { id: "servicos", label: "Serviços" },
  { id: "experiencia", label: "Experiência" },
  { id: "cursos", label: "Cursos" },
  { id: "portfolio", label: "Portfólio" },
];

function SideNav() {
  const [activeId, setActiveId] = useState("inicio");

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
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.15, 0.35, 0.55],
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
    <SideNavWrapper aria-label="Navegação por seções">
      {SECTIONS.map((section) => (
        <Bookmark
          key={section.id}
          type="button"
          $active={activeId === section.id}
          onClick={() => scrollToSection(section.id)}
          aria-current={activeId === section.id ? "true" : undefined}
        >
          <span className="bookmark__label">{section.label}</span>
          <span className="bookmark__notch" />
        </Bookmark>
      ))}
    </SideNavWrapper>
  );
}

export default SideNav;
