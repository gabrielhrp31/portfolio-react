"use client";

import React, { useEffect } from "react";
import { Parallax, TransitionLogo } from "./styles";
import {
  FaChevronDown,
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import { ImMail4 } from "react-icons/im";

const SOCIAL_ICON_SIZE = 40;
const ARROW_ICON_SIZE = 45;

// Invalidates in-flight typewriters across React Strict Mode remounts.
let typewriterGeneration = 0;

function Presentation() {
  useEffect(() => {
    const generation = ++typewriterGeneration;

    async function runTypewriter() {
      clearText();
      await typeSentence("Olá me chamo", "sentence", 100, generation);
      await typeSentence(" Gabriel Rodrigues ", "sentence-name", 100, generation);
      await typeSentence(
        " desenvolvedor fullstack.",
        "sentence-final",
        100,
        generation
      );
    }

    runTypewriter();

    const interval = setInterval(() => {
      stutterLogo();
    }, 5000);

    return () => {
      typewriterGeneration += 1;
      clearInterval(interval);
      clearText();
    };
  }, []);

  const stutterLogo = () => {
    const logoElm = document.getElementById("logo");
    if (!logoElm) return;
    logoElm.classList.add("show");
    setTimeout(() => {
      logoElm.classList.remove("show");
    }, 2500);
  };

  function clearText() {
    deleteSentence("sentence-final");
    deleteSentence("sentence-name");
    deleteSentence("sentence");
  }

  function deleteSentence(eleRef) {
    const el = document.getElementById(eleRef);
    if (el) el.textContent = "";
  }

  async function typeSentence(sentence, eleRef, delay, generation) {
    const letters = sentence.split("");
    let i = 0;
    while (i < letters.length) {
      if (generation !== typewriterGeneration) return;
      await waitForMs(delay);
      if (generation !== typewriterGeneration) return;
      const el = document.getElementById(eleRef);
      if (el) el.textContent += letters[i];
      i += 1;
    }
  }

  function waitForMs(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function handleArrowClick() {
    window.scrollTo(0, window.innerHeight + 50);
  }

  return (
    <Parallax>
      <div className="p-content">
        <TransitionLogo
          id="logo"
          $image="/assets/logos/Isologoverde.png"
          $hoverImage="/assets/logos/Isologomescla.png"
        />
        <div className="p-content__text">
          <span id="sentence" />
          <span id="sentence-name" className="p-content__text__name" />
          <span id="sentence-final" />
          <span className="p-content__input_cursor" />
        </div>
        <div className="p-content__socials">
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
