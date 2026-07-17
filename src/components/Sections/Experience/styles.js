import styled from "styled-components";

export const ExperienceWrapper = styled.section`
  width: min(1100px, calc(100% - 32px));
  margin: clamp(48px, 8vw, 80px) auto 40px;
  transition: color 0.45s ease;

  .experience__list {
    margin-top: 28px;
    display: flex;
    flex-direction: column;
    gap: 0;
    border-left: 2px solid ${({ theme }) => theme.softAccent}66;
    padding-left: clamp(20px, 4vw, 28px);
    margin-left: 4px;
  }

  .experience-spotlight {
    border-radius: 16px;
  }
`;

export const ExperienceItem = styled.article`
  position: relative;
  padding: 0 0 22px;

  &::before {
    content: "";
    position: absolute;
    left: calc(-1 * clamp(20px, 4vw, 28px) - 7px);
    top: 22px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${({ theme }) => theme.softAccent};
    box-shadow: 0 0 0 4px ${({ theme }) => theme.background};
  }

  .experience__card {
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 16px;
    padding: clamp(14px, 3vw, 20px);
    background: ${({ theme }) => theme.surface};
    box-shadow: ${({ theme }) => theme.shadow};
  }

  .experience__company {
    color: ${({ theme }) => theme.softAccent};
    font-size: clamp(18px, 4vw, 22px);
    font-weight: 600;
  }

  .experience__role {
    display: block;
    margin-top: 4px;
    color: ${({ theme }) => theme.titles};
    font-size: clamp(16px, 3.5vw, 18px);
    font-weight: 500;
  }

  .experience__meta {
    display: block;
    margin-top: 6px;
    color: ${({ theme }) => theme.textMuted};
    font-size: 14px;
  }

  .experience__description {
    margin-top: 12px;
    color: ${({ theme }) => theme.titles};
    font-size: 16px;
    line-height: 1.55;
    text-align: left;

    @media (min-width: 768px) {
      text-align: justify;
    }
  }
`;
