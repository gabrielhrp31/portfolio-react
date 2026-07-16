import styled from "styled-components";
import { colorScheme } from "@/styles/themes";

export const ServiceWrapper = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 284px;
  box-sizing: border-box;

  .icon-wrapper {
    background: ${colorScheme.offWhite};
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 149px;
    flex-shrink: 0;
    overflow: hidden;

    svg {
      display: block;
      width: 56px !important;
      height: 56px !important;
      min-width: 56px !important;
      min-height: 56px !important;
      max-width: 56px !important;
      max-height: 56px !important;
      font-size: 56px !important;
      fill: ${colorScheme.green};
      color: ${colorScheme.green};
      margin-bottom: 10px;
      flex-shrink: 0;
    }

    span {
      color: ${colorScheme.gray};
      font-size: 22px;
      font-weight: bold;
      line-height: 1.2;
      text-align: center;
      padding: 0 8px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }

  .description {
    margin-top: 15px;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    color: ${colorScheme.offWhite};
    opacity: 1;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.45);
    line-height: 1.45;
    flex: 1;
    min-height: 93px;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;
