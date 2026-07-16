import styled from "styled-components";

const gap = "100px";
const textAndInfosSize = 75;
const calculateSize = () => {
  return 100 - textAndInfosSize;
};

export const AboutWrapper = styled.section`
  position: relative;
  padding: clamp(72px, 10vw, 120px) clamp(16px, 4vw, 50px) clamp(36px, 5vw, 50px);
  height: fit-content;
  z-index: 1;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.softAccent};
  transition: background-color 0.45s ease;
`;

export const AboutContent = styled.div`
  width: 100%;
  display: flex;
  flex-flow: wrap;
  gap: 32px;

  @media (min-width: 1024px) {
    gap: ${gap};
  }

  .infos-and-picture {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;

    .text {
      font-size: clamp(16px, 2.5vw, 18px);
      color: ${({ theme }) => theme.text};
      text-align: center;

      @media (min-width: 1024px) {
        text-align: left;
      }
    }

    .profile-image {
      width: min(56vw, 220px);
      max-width: 280px;
      margin-bottom: 24px;
      border-radius: 34px;
      overflow: hidden;
      line-height: 0;

      img {
        width: 100% !important;
        height: auto !important;
        border-radius: 34px;
        object-fit: cover;
      }

      @media (min-width: 1024px) {
        width: 100%;
        max-width: 100%;
      }
    }

    .linkedin-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin-top: 28px;
      padding: 12px 22px;
      min-height: 44px;
      width: auto;
      max-width: none;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.28);
      background: rgba(15, 22, 18, 0.22);
      color: #ffffff;
      backdrop-filter: blur(8px);
      font-size: 15px;
      font-weight: 600;
      letter-spacing: 0.02em;
      line-height: 1;
      text-decoration: none;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
      transition: background-color 0.25s ease, border-color 0.25s ease,
        transform 0.25s ease, box-shadow 0.25s ease;

      svg {
        width: 18px !important;
        height: 18px !important;
        flex-shrink: 0;
        fill: currentColor;
      }

      &:hover {
        background: rgba(15, 22, 18, 0.38);
        border-color: rgba(255, 255, 255, 0.45);
        transform: translateY(-2px);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.18);
      }

      &:focus-visible {
        outline: 2px solid #ffffff;
        outline-offset: 3px;
      }
    }

    @media (min-width: 1024px) {
      width: ${calculateSize() + "%"};
    }
  }

  .text-and-infos {
    width: 100%;

    .title {
      font-size: clamp(22px, 4vw, 28px);
      color: ${({ theme }) => (theme.dark ? theme.titles : theme.text)};
      margin-bottom: 24px;
      font-weight: 600;
    }

    .text {
      font-size: 16px;
      color: ${({ theme }) => theme.text};
      margin-bottom: 42px;
      text-align: left;

      @media (min-width: 768px) {
        text-align: justify;
      }
    }

    .text-and-image {
      display: flex;
      align-items: flex-start;
      gap: clamp(12px, 3vw, 20px);
      text-align: left;
      color: ${({ theme }) => theme.text};
      margin-bottom: 32px;

      @media (min-width: 768px) {
        align-items: center;
        text-align: justify;
      }

      img {
        border-radius: 100%;
        width: clamp(56px, 12vw, 70px) !important;
        height: clamp(56px, 12vw, 70px) !important;
        object-fit: cover;
        flex-shrink: 0;
      }
    }

    @media (min-width: 1024px) {
      width: calc(${textAndInfosSize + "%"} - ${gap});
    }
  }

  .tech-icon {
    width: 80px;
    background-color: ${({ theme }) => theme.background};
    fill: ${({ theme }) => theme.softAccent};
    border-radius: 15px;
    padding-top: 11px;
    padding-bottom: 11px;
    padding-left: 10px;
    padding-right: 12px;
  }

  /* Scale tech chips on narrow screens (Tecnologies uses fixed pixel size). */
  .text-and-infos [class*="icon-wrapper"],
  .text-and-infos > div {
    max-width: 100%;
  }

  @media (max-width: 640px) {
    .text-and-infos .icon-wrapper {
      min-width: 56px !important;
      width: 56px !important;
      height: 56px !important;

      i {
        font-size: 31px !important;
      }
    }
  }

  @media (min-width: 1280px) {
    width: 100%;
    max-width: 1280px;
  }
`;
