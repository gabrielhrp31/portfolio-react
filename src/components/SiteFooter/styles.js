import styled from "styled-components";

export const FooterWrapper = styled.footer`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 100%;
  padding: 28px clamp(14px, 4vw, 18px) clamp(28px, 6vw, 36px);
  background: ${({ theme }) => theme.background};

  @media (max-width: 900px) {
    /* Clear fixed bottom section nav */
    padding-bottom: calc(28px + env(safe-area-inset-bottom, 0px));
  }

  .footer-inner {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    border-top: 1px solid ${({ theme }) => theme.border};
    padding-top: 18px;
  }

  .left {
    color: ${({ theme }) => theme.textMuted};
    font-size: 13px;
    font-weight: 600;
    line-height: 1.45;
  }

  .right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-shrink: 0;
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 40px;
    width: min(130px, 36vw);
  }

  @media (max-width: 640px) {
    .footer-inner {
      flex-direction: column;
      align-items: flex-start;
    }

    .right {
      width: 100%;
      justify-content: flex-start;
    }
  }
`;
