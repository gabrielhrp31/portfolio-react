"use client";

import styled, { css } from "styled-components";

const toneStyles = {
  onDark: css`
    color: ${({ $active }) => ($active ? "#152018" : "#EBF4F8")};
    background: ${({ $active }) => ($active ? "#EBF4F8" : "#48c558")};
    border: 1px solid rgba(235, 244, 248, 0.35);

    .bookmark__notch {
      background: ${({ $active }) => ($active ? "#48c558" : "#152018")};
    }
  `,
  onGreen: css`
    color: ${({ $active }) => ($active ? "#1E2B24" : "#F3F7F4")};
    background: ${({ $active }) => ($active ? "#FFFFFF" : "#1E2B24")};
    border: 1px solid rgba(30, 43, 36, 0.25);

    .bookmark__notch {
      background: ${({ $active }) => ($active ? "#1DB954" : "#48c558")};
    }
  `,
  onSurface: css`
    color: ${({ theme, $active }) =>
      $active ? theme.bookmarkText : theme.titles};
    background: ${({ theme, $active }) =>
      $active ? theme.bookmarkActive : theme.surface};
    border: 1px solid ${({ theme }) => theme.border};

    .bookmark__notch {
      background: ${({ theme, $active }) =>
        $active ? theme.bookmarkText : theme.softAccent};
    }
  `,
};

export const SideNavWrapper = styled.nav`
  position: fixed;
  top: 50%;
  right: 0;
  z-index: 1200;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  padding-right: 0;
  pointer-events: none;

  @media (max-width: 900px) {
    display: none;
  }
`;

export const Bookmark = styled.button`
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  min-height: 42px;
  padding: 8px 14px 8px 18px;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadow};
  border-radius: 14px 0 0 14px;
  transform: translateX(${({ $active }) => ($active ? "0" : "46%")});
  transition: transform 0.25s ease, background 0.3s ease, color 0.3s ease,
    border-color 0.3s ease;
  writing-mode: horizontal-tb;
  backdrop-filter: blur(8px);

  ${({ $tone }) => toneStyles[$tone] || toneStyles.onSurface}

  &:hover {
    transform: translateX(0);
  }

  .bookmark__label {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.02em;
    white-space: nowrap;
  }

  .bookmark__notch {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    opacity: 0.95;
    flex-shrink: 0;
  }
`;
