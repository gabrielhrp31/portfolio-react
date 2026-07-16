"use client";

import { createGlobalStyle } from "styled-components";
import { fontFaces } from "./fonts";
import animations from "./animations";

export default createGlobalStyle`
  ${fontFaces}
  ${animations}

  * {
    box-sizing: border-box;
    margin: 0;
    outline: 0;
    font-family: "Outfit", Arial, sans-serif;
  }

  html {
    scroll-behavior: smooth;
  }

  button {
    border: none;
    outline: none;
  }

  body {
    position: relative;
    background: ${(props) => props.theme.background};
    color: ${(props) => props.theme.titles};
    transition: background-color 0.45s ease, color 0.45s ease;

    .global-wrapper {
      padding-bottom: 50px;
      position: relative;
    }
  }

  a {
    transition: color 0.2s ease, transform 0.2s ease;
  }

  h1 {
    color: ${(props) => props.theme.titles};
  }

  .text-green {
    color: ${({ theme }) => theme.softAccent};
  }

  .title-green {
    width: 100%;
    font-size: 36px;
    margin-bottom: 0;
    font-weight: 600;
    color: ${({ theme }) => theme.softAccent};
  }

  .text-bg-reverse {
    width: 100%;
    font-size: 16px;
    color: ${({ theme }) => theme.textMuted};
    text-align: justify;
  }

  .text-bg-reverse-60 {
    font-size: 16px;
    color: ${({ theme }) => theme.textMuted};
    opacity: 0.85;
    text-align: justify;
  }

  section[id] {
    scroll-margin-top: 88px;
  }
`;
