"use client";

import React, { useEffect, useState } from "react";
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

function Presentation() {
  const [writting, setWritting] = useState(false);
  const [writed, setWrited] = useState(false);

  useEffect(() => {
    clearText();
    writeText();
    const interval = setInterval(() => {
      stutterLogo();
    }, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function writeText() {
    if (!writting && !writed) {
      setWritting(true);
      await typeSentence("Olá me chamo", "sentence");
      await typeSentence(" Gabriel Rodrigues ", "sentence-name");
      await typeSentence(" desenvolvedor fullstack.", "sentence-final");
      setWritting(false);
      setWrited(true);
    }
  }

  const stutterLogo = () => {
    const logoElm = document.getElementById("logo");
    if (!logoElm) return;
    logoElm.classList.add("show");
    setTimeout(() => {
      logoElm.classList.remove("show");
    }, 2500);
  };

  async function clearText() {
    deleteSentence("sentence-final");
    deleteSentence("sentence-name");
    deleteSentence("sentence");
  }

  async function deleteSentence(eleRef) {
    const el = document.getElementById(eleRef);
    if (el) el.innerHTML = "";
  }

  async function typeSentence(sentence, eleRef, delay = 100) {
    const letters = sentence.split("");
    let i = 0;
    while (i < letters.length) {
      await waitForMs(delay);
      const el = document.getElementById(eleRef);
      if (el) el.append(letters[i]);
      i += 1;
    }
    return Promise.resolve();
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
            <FaLinkedin className="p-content__socials__icon" />
          </a>
          <a
            href="https://github.com/gabrielhrp31"
            target="_blank"
            rel="noreferrer"
          >
            <SiGithub className="p-content__socials__icon" />
          </a>
          <a
            href="mailto:gabrielws31@gmail.com?subject=Quero realizar um orçamento!"
            target="_blank"
            rel="noreferrer"
          >
            <ImMail4 className="p-content__socials__icon" />
          </a>
          <a
            href="https://api.whatsapp.com/send?phone=5537991243949&text=Ol%C3%A1%20vi%20seu%20portf%C3%B3lio%20e%20quero%20realizar%20um%20or%C3%A7amento!"
            target="_blank"
            rel="noreferrer"
          >
            <SiWhatsapp className="p-content__socials__icon" />
          </a>
        </div>
        <FaChevronDown
          className="p-content__arrow"
          onClick={handleArrowClick}
        />
      </div>
    </Parallax>
  );
}

export default Presentation;
