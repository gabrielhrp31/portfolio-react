import styled from "styled-components";

export const ExperienceWrapper = styled.section`
  width: min(1100px, 90vw);
  margin: 80px auto 40px;
  transition: color 0.45s ease;

  .experience__list {
    margin-top: 28px;
    display: flex;
    flex-direction: column;
    gap: 0;
    border-left: 2px solid ${({ theme }) => theme.softAccent}66;
    padding-left: 24px;
  }
`;

export const ExperienceItem = styled.article`
  position: relative;
  padding: 0 0 36px;

  &::before {
    content: "";
    position: absolute;
    left: -31px;
    top: 8px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${({ theme }) => theme.softAccent};
    box-shadow: 0 0 0 4px ${({ theme }) => theme.background};
  }

  .experience__company {
    color: ${({ theme }) => theme.softAccent};
    font-size: 22px;
    font-weight: 600;
  }

  .experience__role {
    display: block;
    margin-top: 4px;
    color: ${({ theme }) => theme.titles};
    font-size: 18px;
    font-weight: 500;
  }

  .experience__meta {
    display: block;
    margin-top: 6px;
    color: ${({ theme }) => theme.titles};
    opacity: 0.7;
    font-size: 14px;
  }

  .experience__description {
    margin-top: 12px;
    color: ${({ theme }) => theme.titles};
    font-size: 16px;
    line-height: 1.55;
    text-align: justify;
  }
`;
