"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Parallax, TransitionLogo } from "./styles";
import {
  FaChevronDown,
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import { ImMail4 } from "react-icons/im";
import TextType from "@/components/react-bits/TextType";
import ShinyText from "@/components/react-bits/ShinyText";
import Magnet from "@/components/react-bits/Magnet";

const SOCIAL_ICON_SIZE = 40;
const ARROW_ICON_SIZE = 45;
const HERO_TYPED_KEY = "portfolio-hero-typed-v1";
const HERO_FULL_TEXT = "Olá me chamo Gabriel Rodrigues desenvolvedor fullstack.";

function readHeroTyped() {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(HERO_TYPED_KEY) === "1";
  } catch {
    return false;
  }
}

function Presentation() {
  const [typedDone, setTypedDone] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setTypedDone(readHeroTyped());
    setHydrated(true);
  }, []);

  const handleTypingComplete = useCallback(() => {
    try {
      sessionStorage.setItem(HERO_TYPED_KEY, "1");
    } catch {
      /* ignore */
    }
    setTypedDone(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const logoElm = document.getElementById("logo");
      if (!logoElm) return;
      logoElm.classList.add("show");
      setTimeout(() => logoElm.classList.remove("show"), 2500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  function handleArrowClick() {
    const about = document.getElementById("sobre");
    if (about) {
      about.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    window.scrollTo({ top: window.innerHeight + 50, behavior: "smooth" });
  }

  return (
    <Parallax id="inicio">
      <div className="p-content">
        <TransitionLogo
          id="logo"
          $image="/assets/logos/Isologoverde.png"
          $hoverImage="/assets/logos/Isologomescla.png"
        />

        <div className="p-content__text">
          {!hydrated ? (
            <span className="p-content__placeholder">&nbsp;</span>
          ) : typedDone ? (
            <>
              <span>Olá me chamo </span>
              <ShinyText
                text="Gabriel Rodrigues"
                className="p-content__shiny-name"
                color="#48c558"
                shineColor="#EBF4F8"
                speed={2.4}
              />
              <span> desenvolvedor fullstack.</span>
            </>
          ) : (
            <TextType
              text={HERO_FULL_TEXT}
              typingSpeed={55}
              loop={false}
              showCursor
              cursorCharacter="|"
              cursorBlinkDuration={0.55}
              className="p-content__text-type"
              onSentenceComplete={handleTypingComplete}
            />
          )}
        </div>

        <div className="p-content__socials">
          <Magnet padding={20} magnetStrength={3}>
            <a
              href="https://www.linkedin.com/in/gabrielhrp31/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin
                className="p-content__socials__icon"
                size={SOCIAL_ICON_SIZE}
              />
            </a>
          </Magnet>
          <Magnet padding={20} magnetStrength={3}>
            <a
              href="https://github.com/gabrielhrp31"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub
                className="p-content__socials__icon"
                size={SOCIAL_ICON_SIZE}
              />
            </a>
          </Magnet>
          <Magnet padding={20} magnetStrength={3}>
            <a
              href="mailto:gabrielws31@gmail.com?subject=Quero realizar um orçamento!"
              target="_blank"
              rel="noreferrer"
            >
              <ImMail4
                className="p-content__socials__icon"
                size={SOCIAL_ICON_SIZE}
              />
            </a>
          </Magnet>
          <Magnet padding={20} magnetStrength={3}>
            <a
              href="https://api.whatsapp.com/send?phone=5537991243949&text=Ol%C3%A1%20vi%20seu%20portf%C3%B3lio%20e%20quero%20realizar%20um%20or%C3%A7amento!"
              target="_blank"
              rel="noreferrer"
            >
              <FaWhatsapp
                className="p-content__socials__icon"
                size={SOCIAL_ICON_SIZE}
              />
            </a>
          </Magnet>
        </div>

        <button
          type="button"
          className="p-content__arrow-btn"
          onClick={handleArrowClick}
          aria-label="Rolar para baixo"
        >
          <FaChevronDown size={ARROW_ICON_SIZE} />
        </button>
      </div>
    </Parallax>
  );
}

export default Presentation;
