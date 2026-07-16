"use client";

import styled from "styled-components";

export const AdminPage = styled.main`
  min-height: 100vh;
  padding: 32px 16px 64px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.titles};
`;

export const Card = styled.section`
  width: min(920px, 100%);
  margin: 0 auto 24px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.softAccent};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  a {
    color: ${({ theme }) => theme.softAccent};
    text-decoration: none;
    font-weight: 600;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 14px;
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.titles}55;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.titles};
    font: inherit;
  }

  code {
    color: ${({ theme }) => theme.softAccent};
  }
`;

export const Title = styled.h1`
  font-size: 28px;
  color: ${({ theme }) => theme.softAccent};
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  .full {
    grid-column: 1 / -1;
  }
`;

export const PrimaryButton = styled.button`
  background: ${({ theme }) => theme.softAccent};
  color: ${({ theme }) => theme.text};
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  width: fit-content;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SecondaryButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.titles};
  border: 1px solid ${({ theme }) => theme.titles}66 !important;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  width: fit-content;
`;

export const ErrorText = styled.p`
  color: #ff6b6b;
  font-weight: 600;
`;

export const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding: 12px 0;
  border-top: 1px solid ${({ theme }) => theme.titles}33;

  p {
    margin: 6px 0;
    opacity: 0.9;
  }

  small {
    opacity: 0.7;
  }

  .actions {
    display: flex;
    gap: 8px;
    align-items: start;
  }
`;

export const EmptyState = styled.p`
  opacity: 0.75;
`;

export const TabList = styled.div`
  width: min(920px, 100%);
  margin: 0 auto 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  position: sticky;
  top: 0;
  z-index: 20;
  padding: 12px 0 10px;
  background: ${({ theme }) => theme.background};
  border-bottom: 1px solid ${({ theme }) => theme.titles}22;
`;

export const TabButton = styled.button`
  cursor: pointer;
  border-radius: 999px;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.2;
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.softAccent : `${theme.titles}44`} !important;
  background: ${({ theme, $active }) =>
    $active ? theme.softAccent : "transparent"};
  color: ${({ theme, $active }) => ($active ? theme.text : theme.titles)};
  transition: background-color 0.2s ease, border-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.softAccent} !important;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.softAccent};
    outline-offset: 2px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 22px;
  color: ${({ theme }) => theme.softAccent};
  margin: 0;
`;
