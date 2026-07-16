import styled from "styled-components";

export const CoursesWrapper = styled.section`
  width: min(1100px, 90vw);
  margin: 40px auto 60px;

  .courses__grid {
    margin-top: 28px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 18px;

    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }
  }
`;

export const CourseCard = styled.article`
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  padding: 18px 20px;
  background: ${({ theme }) => theme.surface};
  box-shadow: ${({ theme }) => theme.shadow};
  height: 100%;
  transition: background-color 0.45s ease, border-color 0.45s ease;

  .course__kind {
    display: inline-block;
    margin-bottom: 8px;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: ${({ theme }) => theme.softAccent};
    font-weight: 700;
  }

  .course__title {
    color: ${({ theme }) => theme.titles};
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 6px;
  }

  .course__institution {
    color: ${({ theme }) => theme.titles};
    opacity: 0.85;
    font-size: 15px;
  }

  .course__meta {
    display: block;
    margin-top: 6px;
    color: ${({ theme }) => theme.titles};
    opacity: 0.65;
    font-size: 13px;
  }

  .course__description {
    margin-top: 10px;
    color: ${({ theme }) => theme.titles};
    font-size: 15px;
    line-height: 1.5;
  }

  .course__link {
    display: inline-block;
    margin-top: 12px;
    color: ${({ theme }) => theme.softAccent};
    font-weight: 700;
    text-decoration: none;

    &:hover {
      color: ${({ theme }) => theme.titles};
    }
  }
`;
