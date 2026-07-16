import styled from "styled-components";
import { colorScheme } from "@/styles/themes";

export const Parallax = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  background-image: url("/assets/backgrounds/binary.jpg");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  min-height: 100vh;

  .p-content {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    gap: 28px;

    position: relative;

    max-width: 80vw;
    min-height: 80vh;
    padding: 24px 0 32px;

    z-index: 1;

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
    color: white;
    min-height: 1.4em;

    .p-content__shiny-name {
      font-weight: 500;
      vertical-align: baseline;
    }

    .p-content__text-type,
    .text-type {
      color: white;
      font-weight: 200;
    }

    .text-type__cursor {
      color: ${({ theme }) => theme.softAccent};
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

  .p-content__input_cursor {
    display: inline-block;
    width: 2px;
    height: 24px;
    background-color: white;
    margin-left: 8px;
    transform: translateY(8px);
    animation: blink 0.6s linear infinite alternate;

    @media (min-width: 400px) {
      height: 32px;
    }

    @media (min-width: 600px) {
      height: 40px;
    }

    @media (min-width: 1025px) {
      height: 48px;
    }

    @media (min-width: 1920px) {
      height: 64px;
    }
  }

  .p-content__socials {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    z-index: 1;
    font-size: 16px;
    line-height: 1;

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
    }
  }

  &::before {
    content: "";
    display: block;
    pointer-events: none;

    position: absolute;
    inset: 0;

    width: 100%;
    height: 100%;

    background-color: ${({ theme }) => theme.heroOverlay};

    opacity: 1;
    z-index: 0;
  }
`;

export const TransitionLogo = styled.div`
  cursor: pointer;
  position: relative;

  background-image: url(${({ $image }) => $image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

  transition: background 0.5s;

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
