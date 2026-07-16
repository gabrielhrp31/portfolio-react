import styled from "styled-components";
import { colorScheme } from "@/styles/themes";

export const ParallaxWaves = styled.section`
  position: relative;
  background: ${({ theme }) =>
    theme.dark ? colorScheme.gray : theme.inverse};
  height: fit-content;
  overflow: hidden;
  z-index: 100;
  padding: 20vw 50px 22vw 50px;
  transition: background-color 0.45s ease;

  &::before {
    content: "";
    display: block;
    pointer-events: none;
    position: absolute;
    inset: 0;
    z-index: 0;
    opacity: 0.18;
    width: 100%;
    height: 100%;
    background-image: url(${({ $bgImage }) =>
      $bgImage || "/assets/backgrounds/binary.jpg"});
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
  }

  > svg:first-child,
  > svg:last-child {
    position: absolute;
    left: 0;
    width: 100%;
    height: auto;
    z-index: 1;
    pointer-events: none;
  }

  > svg:first-child {
    top: 0;

    > * {
      fill: ${({ theme }) => theme.softAccent} !important;
    }
  }

  > svg:last-child {
    bottom: 0;
    overflow: hidden;
    fill: ${({ theme }) => theme.background} !important;
  }

  .services-heading {
    position: relative;
    z-index: 2;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 36px;
  }

  .services-title {
    color: ${colorScheme.offWhite};
    font-size: 36px;
    font-weight: 700;
  }

  .services-grid {
    position: relative;
    z-index: 2;
    width: min(1100px, 100%);
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, 240px);
    gap: 28px;
    align-items: stretch;
    justify-content: center;
    justify-items: stretch;
  }

  .service-cell {
    width: 240px;
    max-width: 240px;
    height: 100%;
    display: flex;
  }

  .service-spotlight {
    border-radius: 16px;
    padding: 8px;
    width: 100%;
    height: 100%;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }

  .service-spotlight > * {
    width: 100%;
    height: 100%;
    flex: 1;
  }
`
