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
  gap: 8px;
  width: 156px;
  max-height: calc(100vh - 24px);
  padding: 4px 0;
  pointer-events: none;

  @media (max-height: 720px) {
    gap: 5px;
  }

  /* Mobile / tablet: bottom horizontal section nav */
  @media (max-width: 900px) {
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    transform: none;
    flex-direction: row;
    align-items: stretch;
    justify-content: flex-start;
    gap: 8px;
    width: 100%;
    max-width: none;
    max-height: none;
    padding: 10px 12px calc(10px + env(safe-area-inset-bottom, 0px));
    pointer-events: auto;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    background: ${({ theme }) => theme.navBg};
    border-top: 1px solid ${({ theme }) => theme.border};
    backdrop-filter: blur(12px);
    box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.12);

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const Bookmark = styled.button`
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 156px;
  min-height: 40px;
  padding: 8px 14px 8px 16px;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadow};
  border-radius: 14px 0 0 14px;
  /* Same width on every item → same 28px peek strip (no zigzag). */
  transform: translateX(${({ $active }) => ($active ? "0" : "calc(100% - 28px)")});
  transition: transform 0.25s ease, background 0.3s ease, color 0.3s ease,
    border-color 0.3s ease;
  writing-mode: horizontal-tb;
  backdrop-filter: blur(8px);
  overflow: hidden;

  @media (max-height: 720px) {
    min-height: 34px;
    padding: 6px 12px 6px 14px;
  }

  ${({ $tone }) => toneStyles[$tone] || toneStyles.onSurface}

  &:hover,
  &:focus-visible {
    transform: translateX(0);
  }

  .bookmark__label {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.02em;
    white-space: nowrap;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .bookmark__notch {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    opacity: 0.95;
    flex-shrink: 0;
    margin-left: auto;
  }

  @media (max-width: 900px) {
    width: auto;
    min-width: max-content;
    min-height: 40px;
    padding: 8px 14px;
    border-radius: 999px;
    transform: none;
    box-shadow: none;
    flex-shrink: 0;

    &:hover,
    &:focus-visible {
      transform: none;
    }

    .bookmark__notch {
      display: none;
    }

    .bookmark__label {
      font-size: 12px;
    }
  }
`;
