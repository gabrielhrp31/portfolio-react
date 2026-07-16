import styled from "styled-components";
import { colorScheme } from "@/styles/themes";

export const Parallax = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background-image: url("/assets/backgrounds/binary.jpg");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  min-height: 100vh;

  .p-content {
    display: flex;
    flex-flow: column;
    justify-content: space-evenly;
    align-items: center;

    position: relative;

    max-width: 80vw;
    height: 80vh;

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

    a {
      display: inline-flex;
      line-height: 0;
    }
  }

  .p-content__socials__icon {
    width: 40px !important;
    height: 40px !important;
    min-width: 40px;
    min-height: 40px;
    max-width: 40px;
    max-height: 40px;
    font-size: 40px;

    border-radius: 100%;
    overflow: hidden;
    flex-shrink: 0;

    cursor: pointer;

    fill: ${colorScheme.offWhite};
    color: ${colorScheme.offWhite};

    &:hover {
      transform: scale(1.25);
    }

    @media (min-width: 1920px) {
      width: 48px !important;
      height: 48px !important;
      min-width: 48px;
      min-height: 48px;
      max-width: 48px;
      max-height: 48px;
      font-size: 48px;
    }
  }

  .p-content__arrow {
    position: absolute;
    width: 45px !important;
    height: 45px !important;
    font-size: 45px;

    bottom: 0;
    z-index: 100;

    cursor: pointer;

    fill: ${colorScheme.offWhite};
    color: ${colorScheme.offWhite};

    transform: scale(1);
    animation: pulse 2s infinite;
  }

  ::before {
    content: "";
    display: flex;

    position: absolute;
    left: 0;
    top: 0;

    min-height: 100vh;
    width: 100%;

    background-color: rgb(0, 0, 0);

    opacity: 0.8;
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
