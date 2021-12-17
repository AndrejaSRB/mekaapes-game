import styled from "styled-components";
// ******** Theme ********
import * as theme from "../../theme";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  border-radius: 50px;
  margin-bottom: 36px;
  @media only screen and (min-width: 1024px) {
    margin-bottom: 46px;
  }
`;

export const Box = styled.div`
  position: relative;
  z-index: 2;
  border-top: 5px solid ${theme.color.borderColor};
  border-bottom: 5px solid ${theme.color.borderColor};
  border-left: ${({ place }) => {
    if (place === "first") {
      return `5px solid ${theme.color.borderColor}`;
    } else {
      return ` 2px solid ${theme.color.borderColor}`;
    }
  }};
  border-right: ${({ place }) => {
    if (place === "last") {
      return `5px solid ${theme.color.borderColor}`;
    } else {
      return ` 2px solid ${theme.color.borderColor}`;
    }
  }};
  width: 20%;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: ${theme.color.white};
  padding: 10px 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ place }) => {
    if (place === "first") {
      return "50px 0px 0px 50px";
    } else if (place === "last") {
      return "0px 50px 50px 0px";
    } else {
      return "none";
    }
  }};
  .desktop {
    display: none;
  }
  .mobile {
    display: block;
  }
  @media only screen and (min-width: 580px) {
    .desktop {
      display: block;
    }
    .mobile {
      display: none;
    }
  }
  @media only screen and (min-width: 1024px) {
    font-size: 28px;
    padding: 35px 70px;
    border-top: 10px solid ${theme.color.borderColor};
    border-bottom: 10px solid ${theme.color.borderColor};
    border-left: ${({ place }) => {
      if (place === "first") {
        return `10px solid ${theme.color.borderColor}`;
      } else {
        return ` 5px solid ${theme.color.borderColor}`;
      }
    }};
    border-right: ${({ place }) => {
      if (place === "last") {
        return `10px solid ${theme.color.borderColor}`;
      } else {
        return ` 5px solid ${theme.color.borderColor}`;
      }
    }};
  }
`;

export const Color = styled.div`
  position: absolute;
  background: ${({ width }) => (width === 100 ? `#F5811B` : theme.color.green)};
  width: ${({ width }) => `${width}%`};
  height: 46px;
  z-index: 1;
  @media only screen and (min-width: 1024px) {
    height: 96px;
  }
`;
