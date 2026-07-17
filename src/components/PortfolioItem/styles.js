import styled from "styled-components";

export const PortfolioItemWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 0;

  border: 2px solid ${({ theme }) => theme.softAccent};
  border-radius: 20px;
  overflow: hidden;
  background: ${({ theme }) => theme.surface};
  box-shadow: ${({ theme }) => theme.shadow};
  transition: background-color 0.45s ease, border-color 0.45s ease,
    transform 0.25s ease;

  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    min-height: 420px;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translateY(-4px);
    }
  }

  a {
    color: ${({ theme }) => theme.softAccent};
    text-decoration: none;
    font-weight: bold;
  }

  .portfolio__item__title,
  .shiny-text.portfolio__item__title {
    display: block;
    width: 100%;
    padding: 12px 16px 0;
    color: ${({ theme }) => theme.titles};
    font-size: clamp(20px, 4vw, 28px);
    text-transform: capitalize;
    text-align: center;
    font-weight: 600;
  }

  .portfolio__item__description {
    display: block;
    width: 92%;
    margin: 10px auto 0;
    text-align: center;
    color: ${({ theme }) => theme.textMuted};
    font-size: 15px;
    font-weight: 300;
    flex: 1;
  }

  .portfolio__item__links {
    display: flex;
    justify-content: flex-end;
    flex-flow: wrap;
    gap: 16px 24px;
    width: 100%;
    padding: 12px clamp(14px, 4vw, 24px) 20px;

    a {
      text-decoration: none;
      font-size: 16px;
      text-transform: uppercase;

      &:hover {
        color: ${({ theme }) => theme.titles};
      }
    }
  }

  .portfolio__item__img-wrapper {
    width: 100%;
    height: clamp(160px, 40vw, 210px);
    overflow: hidden;
    position: relative;
    flex-shrink: 0;

    .portfolio__item__techs-wrapper {
      position: absolute;
      bottom: 10px;
      right: 10px;
      z-index: 2;
      max-width: calc(100% - 20px);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.45s ease;
    }
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover .portfolio__item__img-wrapper img {
      transform: scale(1.06);
    }
  }
`;
