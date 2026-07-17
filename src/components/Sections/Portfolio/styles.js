import styled from "styled-components";

export const PortfolioWrapper = styled.section`
  width: min(1200px, calc(100% - 32px));
  margin: clamp(36px, 6vw, 50px) auto clamp(56px, 8vw, 80px);
  display: flex;
  flex-direction: column;
  gap: 20px;

  .portfolio__intro {
    width: 100%;
  }

  .portfolio__items {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 260px), 1fr));
    gap: clamp(16px, 3vw, 28px);
    align-items: stretch;
  }

  .portfolio-spotlight {
    width: 100%;
    max-width: 100%;
    height: 100%;
  }

  @media (min-width: 1100px) {
    .portfolio__items {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;
