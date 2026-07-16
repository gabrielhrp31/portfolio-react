import styled from "styled-components";
import { colorScheme } from "@/styles/themes";

export const Parallax = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  min-height: 100vh;
  background: #050805;

  .hero-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    filter: saturate(1.15) contrast(1.05) brightness(0.55);
    transform: scale(1.02);

    img {
      object-fit: cover;
      object-position: center;
    }
  }

  .hero-glitch {
    position: absolute;
    inset: 0;
    z-index: 1;
    opacity: 0.42;
    mix-blend-mode: screen;
    pointer-events: none;
  }

  .hero-veil {
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;
    background:
      radial-gradient(
        ellipse 70% 55% at 50% 45%,
        rgba(0, 0, 0, 0.28) 0%,
        rgba(0, 0, 0, 0.72) 70%,
        rgba(0, 0, 0, 0.88) 100%
      ),
      linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.55) 0%,
        rgba(0, 0, 0, 0.35) 40%,
        rgba(0, 0, 0, 0.7) 100%
      ),
      ${({ theme }) => theme.heroOverlay};
  }

  .p-content {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    gap: 28px;

    position: relative;
    z-index: 3;

    max-width: 80vw;
    min-height: 80vh;
    padding: 28px 20px;
    border-radius: 24px;

    @media (min-width: 769px) {
      max-width: 50vw;
    }

    @media (min-width: 1920px) {
      max-width: 30vw;
    }
  }

  .p-content__logo-hover-show {
    opacity: 0;
  }

  .p-content__text {
    text-align: center;
    font-weight: 200;
    font-size: 22px;
    color: #f5fff8;
    min-height: 1.4em;
    text-shadow:
      0 2px 18px rgba(0, 0, 0, 0.85),
      0 1px 2px rgba(0, 0, 0, 0.9),
      0 0 24px rgba(16, 40, 22, 0.65);

    .p-content__shiny-name {
      font-weight: 600;
      vertical-align: baseline;
      text-shadow:
        0 2px 14px rgba(0, 0, 0, 0.8),
        0 0 18px rgba(72, 197, 88, 0.35);
    }

    .p-content__text-type,
    .text-type {
      color: #f5fff8;
      font-weight: 200;
    }

    .text-type__cursor {
      color: ${({ theme }) => theme.softAccent};
      text-shadow: 0 0 10px ${({ theme }) => theme.softAccent};
    }

    @media (min-width: 1025px) {
      font-size: 48px;
    }

    @media (min-width: 1920px) {
      font-size: 64px;
    }
  }

  .p-content__text__name {
    color: ${({ theme }) => theme.softAccent};
  }

  .p-content__socials {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    z-index: 1;
    font-size: 16px;
    line-height: 1;
    padding: 10px 14px;
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.28);
    border: 1px solid rgba(235, 244, 248, 0.12);
    backdrop-filter: blur(6px);

    a {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      line-height: 0;
      flex: 0 0 40px;
    }

    svg.p-content__socials__icon,
    .p-content__socials__icon {
      display: block;
      width: 40px !important;
      height: 40px !important;
      min-width: 40px !important;
      min-height: 40px !important;
      max-width: 40px !important;
      max-height: 40px !important;
      font-size: 40px !important;

      border-radius: 100%;
      overflow: hidden;
      flex-shrink: 0;

      cursor: pointer;

      fill: ${colorScheme.offWhite};
      color: ${colorScheme.offWhite};
      filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.55));

      &:hover {
        transform: scale(1.25);
      }
    }
  }

  .p-content__arrow-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: 8px;
    padding: 0;
    background: transparent;
    border: none;
    cursor: pointer;
    z-index: 2;
    animation: pulse 2s infinite;

    svg {
      display: block;
      width: 45px !important;
      height: 45px !important;
      fill: ${colorScheme.offWhite};
      color: ${colorScheme.offWhite};
      filter: drop-shadow(0 2px 10px rgba(0, 0, 0, 0.7));
    }
  }
`;

export const TransitionLogo = styled.div`
  cursor: pointer;
  position: relative;
  z-index: 2;

  background-image: url(${({ $image }) => $image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

  transition: background 0.5s;
  filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.55));

  &:hover,
  &.show {
    background-image: url(${({ $hoverImage }) => $hoverImage});
  }

  margin-left: auto;
  margin-right: auto;
  width: min(175px, 80vw);
  height: min(175px, 80vw);

  @media (min-width: 1920px) {
    width: min(230px, 80vw);
    height: min(230px, 80vw);
  }
`;
