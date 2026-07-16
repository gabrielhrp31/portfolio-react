import styled from "styled-components";

export const NavbarWrapper = styled.div`
  position: ${({ $afterNavbar }) => ($afterNavbar ? "fixed" : "relative")};
  z-index: 1000;
  top: 0;
  left: 0;

  width: 100%;
  max-width: 100%;
  height: 64px;

  display: flex;
  align-items: center;

  background-color: ${({ theme }) => theme.navBg};
  backdrop-filter: blur(10px);
  color: ${({ theme }) => theme.softAccent};
  border-bottom: 1px solid ${({ theme }) => theme.border};

  transition: background-color 0.45s ease, border-color 0.45s ease,
    color 0.45s ease;

  .n-logo {
    width: auto !important;
    height: 75% !important;
    max-height: 48px;
    margin-left: auto;
    object-fit: contain;
  }
`;

export const ThemeButton = styled.button`
  margin-left: auto;
  margin-right: 20px;
  padding: 8px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  background-color: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.softAccent};
  border: 1px solid ${({ theme }) => theme.border} !important;
  box-shadow: ${({ theme }) => theme.shadow};

  font-size: 18px;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.25s ease;

  &:hover {
    transform: translateY(-1px);
  }

  span {
    font-size: 12px;
    font-weight: 700;
    color: ${({ theme }) => theme.titles};
  }
`;
