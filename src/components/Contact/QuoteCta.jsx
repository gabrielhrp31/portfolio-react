"use client";

import React from "react";
import styled, { css } from "styled-components";
import { useQuoteModal } from "./QuoteModalContext";
import { useSiteSettings } from "@/components/SiteSettingsProvider";
import { settingValue } from "@/lib/settings";

const variants = {
  solid: css`
    background: ${({ theme }) => theme.softAccent};
    color: #0e1b12;
    border: 1px solid transparent;
  `,
  soft: css`
    background: rgba(15, 22, 18, 0.22);
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.28);
    backdrop-filter: blur(8px);
  `,
  outline: css`
    background: transparent;
    color: ${({ theme }) => theme.softAccent};
    border: 1px solid ${({ theme }) => theme.softAccent};
  `,
};

const Button = styled.button`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 999px;
  padding: 12px 20px;
  min-height: 44px;
  max-width: 100%;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.02em;
  transition: transform 0.2s ease, filter 0.2s ease, background 0.2s ease;
  box-shadow: ${({ theme }) => theme.shadow};
  ${({ $variant }) => variants[$variant] || variants.solid}

  @media (max-width: 480px) {
    width: 100%;
    padding: 12px 16px;
  }

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.05);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.softAccent};
    outline-offset: 3px;
  }
`;

export default function QuoteCta({
  label,
  variant = "solid",
  source = "cta",
  className = "",
}) {
  const { openModal } = useQuoteModal();
  const settings = useSiteSettings();
  const resolvedLabel =
    label || settingValue(settings, "cta_quote_label", "Solicitar orçamento");

  return (
    <Button
      type="button"
      className={className}
      $variant={variant}
      onClick={() => openModal({ source })}
    >
      {resolvedLabel}
    </Button>
  );
}
