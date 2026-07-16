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
import LetterGlitch from "@/components/react-bits/LetterGlitch";
import FadeContent from "@/components/react-bits/FadeContent";
import OptimizedImage from "@/components/OptimizedImage";
import { mediaUrl } from "@/lib/media";

const SOCIAL_ICON_SIZE = 40;
const ARROW_ICON_SIZE = 45;
const HERO_TYPED_KEY = "portfolio-hero-typed-v1";
const HERO_FULL_TEXT = "Olá me chamo Gabriel Rodrigues desenvolvedor fullstack.";

const SOCIALS = [
  {
    key: "linkedin",
    href: "https://www.linkedin.com/in/gabrielhrp31/",
    Icon: FaLinkedin,
    label: "LinkedIn",
  },
  {
    key: "github",
    href: "https://github.com/gabrielhrp31",
    Icon: FaGithub,
    label: "GitHub",
  },
  {
    key: "email",
    href: "mailto:gabrielws31@gmail.com?subject=Quero realizar um orçamento!",
    Icon: ImMail4,
    label: "E-mail",
  },
  {
    key: "whatsapp",
    href: "https://api.whatsapp.com/send?phone=5537991243949&text=Ol%C3%A1%20vi%20seu%20portf%C3%B3lio%20e%20quero%20realizar%20um%20or%C3%A7amento!",
    Icon: FaWhatsapp,
    label: "WhatsApp",
  },
];

function readHeroTyped() {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(HERO_TYPED_KEY) === "1";
  } catch {
    return false;
  }
}

function Presentation({ media = null }) {
  // 0 logo → 1 text → 2 socials → 3 arrow
  const [stage, setStage] = useState(0);
  const [skipTypewriter, setSkipTypewriter] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const heroBg = mediaUrl(media, "hero_bg");
  const logoHero = mediaUrl(media, "logo_hero");
  const logoHeroHover = mediaUrl(media, "logo_hero_hover");

  useEffect(() => {
    setSkipTypewriter(readHeroTyped());
    setHydrated(true);
  }, []);

  const handleLogoDone = useCallback(() => {
    setStage((current) => Math.max(current, 1));
  }, []);

  const handleTextDone = useCallback(() => {
    try {
      sessionStorage.setItem(HERO_TYPED_KEY, "1");
    } catch {
      /* ignore */
    }
    setSkipTypewriter(true);
    setStage((current) => Math.max(current, 2));
  }, []);

  const handleSocialsDone = useCallback(() => {
    setStage((current) => Math.max(current, 3));
  }, []);

  // When returning in the same session, skip typing and continue the intro fluidly.
  useEffect(() => {
    if (stage !== 1 || !skipTypewriter) return undefined;
    const timer = setTimeout(() => {
      setStage((current) => Math.max(current, 2));
    }, 700);
    return () => clearTimeout(timer);
  }, [stage, skipTypewriter]);

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
      <div className="hero-bg" aria-hidden="true">
        <OptimizedImage
          src={heroBg}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={70}
          objectFit="cover"
        />
      </div>
      <div className="hero-glitch" aria-hidden="true">
        <LetterGlitch
          glitchSpeed={70}
          smooth
          outerVignette={false}
          centerVignette={false}
          backgroundColor="transparent"
          glitchColors={["#163524", "#2f8f4e", "#48c558", "#9dffb0"]}
          characters="01<>{}[]/=+*&$#@ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        />
      </div>
      <div className="hero-veil" aria-hidden="true" />

      <div className="p-content">
        <FadeContent
          playOnMount
          blur
          duration={850}
          delay={80}
          yOffset={22}
          className="p-content__logo-wrap"
          onComplete={handleLogoDone}
        >
          <TransitionLogo
            id="logo"
            $image={logoHero}
            $hoverImage={logoHeroHover}
          />
        </FadeContent>

        {hydrated && stage >= 1 ? (
          <FadeContent
            playOnMount
            blur
            duration={700}
            delay={40}
            yOffset={18}
            className="p-content__text"
          >
            {skipTypewriter ? (
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
                typingSpeed={48}
                loop={false}
                showCursor
                cursorCharacter="|"
                cursorBlinkDuration={0.55}
                className="p-content__text-type"
                onSentenceComplete={handleTextDone}
              />
            )}
          </FadeContent>
        ) : (
          <div className="p-content__text p-content__text--slot" aria-hidden="true" />
        )}

        {stage >= 2 ? (
          <FadeContent
            playOnMount
            blur
            duration={650}
            delay={60}
            yOffset={14}
            className="p-content__socials"
            onComplete={handleSocialsDone}
          >
            {SOCIALS.map(({ key, href, Icon, label }, index) => (
              <FadeContent
                key={key}
                playOnMount
                duration={450}
                delay={80 + index * 90}
                yOffset={10}
                blur={false}
              >
                <Magnet padding={10} magnetStrength={3}>
                  <a href={href} target="_blank" rel="noreferrer" aria-label={label}>
                    <Icon
                      className="p-content__socials__icon"
                      size={SOCIAL_ICON_SIZE}
                    />
                  </a>
                </Magnet>
              </FadeContent>
            ))}
          </FadeContent>
        ) : (
          <div className="p-content__socials p-content__socials--slot" aria-hidden="true" />
        )}

        {stage >= 3 ? (
          <FadeContent playOnMount blur duration={600} delay={40} yOffset={12}>
            <button
              type="button"
              className="p-content__arrow-btn"
              onClick={handleArrowClick}
              aria-label="Rolar para baixo"
            >
              <FaChevronDown size={ARROW_ICON_SIZE} />
            </button>
          </FadeContent>
        ) : (
          <div className="p-content__arrow-slot" aria-hidden="true" />
        )}
      </div>
    </Parallax>
  );
}

export default Presentation;
