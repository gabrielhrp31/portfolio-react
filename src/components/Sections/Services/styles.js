import styled from "styled-components";
import { colorScheme } from "@/styles/themes";

export const ParallaxWaves = styled.section`
  position: relative;
  background: #050805;
  height: fit-content;
  overflow: hidden;
  z-index: 100;
  /* Extra vertical room so cards sit clear of the wave curves */
  padding: clamp(140px, 20vw, 300px) clamp(16px, 4vw, 50px)
    clamp(120px, 16vw, 240px);
  transition: background-color 0.45s ease;

  .services-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    filter: saturate(1.1) contrast(1.02) brightness(0.78);
    transform: scale(1.02);

    img {
      object-fit: cover;
      object-position: center;
    }
  }

  .services-glitch {
    position: absolute;
    inset: 0;
    z-index: 1;
    opacity: 0.55;
    mix-blend-mode: screen;
    pointer-events: none;
  }

  .services-veil {
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;
    background:
      radial-gradient(
        ellipse 70% 55% at 50% 45%,
        rgba(0, 0, 0, 0.12) 0%,
        rgba(0, 0, 0, 0.42) 70%,
        rgba(0, 0, 0, 0.58) 100%
      ),
      linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.32) 0%,
        rgba(0, 0, 0, 0.18) 40%,
        rgba(0, 0, 0, 0.45) 100%
      ),
      ${({ theme }) => theme.heroOverlay};
  }

  > svg:first-of-type,
  > svg:last-of-type {
    position: absolute;
    left: 0;
    width: 100%;
    height: clamp(72px, 10vw, 140px);
    z-index: 3;
    pointer-events: none;
  }

  > svg:first-of-type {
    top: 0;

    > * {
      fill: ${({ theme }) => theme.softAccent} !important;
    }
  }

  > svg:last-of-type {
    bottom: 0;
    overflow: hidden;
    fill: ${({ theme }) => theme.background} !important;
  }

  .services-heading {
    position: relative;
    z-index: 4;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: clamp(28px, 5vw, 44px);
  }

  .services-title {
    color: ${colorScheme.offWhite};
    font-size: clamp(26px, 5vw, 36px);
    font-weight: 700;
  }

  .services-grid {
    position: relative;
    z-index: 4;
    width: min(1100px, 100%);
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
    gap: clamp(20px, 3.5vw, 32px);
    align-items: stretch;
    justify-content: center;
    justify-items: stretch;
  }

  .service-cell {
    width: 100%;
    max-width: none;
    height: 100%;
    display: flex;
  }

  .service-spotlight {
    border-radius: 16px;
    padding: 8px;
    width: 100%;
    height: 100%;
    min-height: 260px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }

  .service-spotlight > * {
    width: 100%;
    height: 100%;
    flex: 1;
  }

  .services-cta {
    position: relative;
    z-index: 4;
    display: flex;
    justify-content: center;
    margin-top: clamp(24px, 4vw, 36px);
    padding: 0 4px;
  }
`;
