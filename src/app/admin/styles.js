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
