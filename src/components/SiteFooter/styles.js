import styled from "styled-components";

export const FooterWrapper = styled.footer`
  position: relative;
  z-index: 2;
  width: 100%;
  padding: 28px 18px 36px;
  background: ${({ theme }) => theme.background};

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
  }

  .right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 44px;
    width: 130px;
  }

  @media (max-width: 560px) {
    .footer-inner {
      flex-direction: column;
      align-items: flex-start;
    }

    .right {
      width: 100%;
      justify-content: flex-end;
    }
  }
`;
