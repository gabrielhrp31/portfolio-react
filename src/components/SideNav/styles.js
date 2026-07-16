"use client";

import styled from "styled-components";

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
  border: none;
  cursor: pointer;
  color: ${({ theme, $active }) =>
    $active ? theme.bookmarkText : theme.titles};
  background: ${({ theme, $active }) =>
    $active ? theme.bookmarkActive : theme.bookmark};
  box-shadow: ${({ theme }) => theme.shadow};
  border-radius: 14px 0 0 14px;
  transform: translateX(${({ $active }) => ($active ? "0" : "46%")});
  transition: transform 0.25s ease, background 0.25s ease, color 0.25s ease;
  writing-mode: horizontal-tb;

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
    background: ${({ theme, $active }) =>
      $active ? theme.bookmarkText : theme.background};
    opacity: 0.9;
    flex-shrink: 0;
  }
`;
