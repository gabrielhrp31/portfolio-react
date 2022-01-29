import styled from "styled-components";

const gap = "100px";
const textAndInfosSize = 75;
const calculateSize = () => {
		return 100 - textAndInfosSize;
};

export const AboutWrapper = styled.div`
	position: relative;
	padding: 120px 50px 50px;
	height: fit-content;

	display: flex;
	justify-content: center;

	background-color: ${({theme}) => theme.softAccent};
`
export const AboutContent = styled.div`
  width: 100%;

  display: flex;
  flex-flow: wrap;
  gap: ${gap};

  .infos-and-picture {
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;

    .text {
      font-size: 18px;
      color: ${({theme}) => theme.text};
      text-align: justify;
    }

    img {
      max-width: 40%;
      border-radius: 34px;
      margin-bottom: 24px;

      @media (min-width: 1196px) {
        max-width: 100%;
      }
    }

    button {
      width: 100%;
      max-width: min(350px, 80%);
      height: 60px;

      display: flex;
      justify-content: space-evenly;
      align-items: center;

      margin-top: 24px;

      border-radius: 8px;

      font-size: 22px;
      font-weight: 600;

      background-color: ${({theme}) => theme.background};
      color: ${({theme}) => theme.softAccent};

      svg {
        width: 26px;
        height: unset;
      }
    }

    @media (min-width: 1196px) {
      width: ${calculateSize() + "%"};
    }
  }

  .text-and-infos {
    width: 100%;

    .title {
      font-size: 28px;
      color: ${({theme}) => theme.titles};
      margin-bottom: 24px;
    }

    .text {
      font-size: 16px;
      color: ${({theme}) => theme.text};
      margin-bottom: 42px;
      text-align: justify;
    }

    .text-and-image {
      display: flex;
      align-items: center;
      gap: 20px;
      text-align: justify;

      color: ${({theme}) => theme.text};
      margin-bottom: 32px;

      img {
        border-radius: 100%;
        width: 70px;
      }
    }

    @media (min-width: 1196px) {
      width: calc(${textAndInfosSize + "%"} - ${gap});
    }
  }

  @media (min-width: 1280px) {
    width: 100%;
    max-width: 1280px;
  }
`
