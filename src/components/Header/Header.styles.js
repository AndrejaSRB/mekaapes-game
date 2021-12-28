import styled, { keyframes } from "styled-components";
// ******** Theme ********
import * as theme from "../../theme";

export const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 10px 16px;
  @media only screen and (min-width: 1300px) {
    padding: 56px 16px 0 16px;
  }
  @media only screen and (min-width: 1320px) {
    width: 1300px;
    margin: 0 auto;
    padding-left: 0;
    padding-right: 0;
  }
`;

export const Logo = styled.h1`
  font-size: 30px;
  & > a {
    img {
      width: 152px;
      height: 40px;
    }
  }
  @media only screen and (min-width: 1300px) {
    margin-right: 8px;
  }
`;

export const AccountMobile = styled.div`
  display: block;
  color: ${theme.color.white};
  font-size: 18px;
  width: 100%;
  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    & > span {
      margin-right: 8px;
      color: ${theme.color.grey};
    }
    & > img {
      width: 28px;
      margin-left: 11px;
    }
  }
  @media only screen and (min-width: 1300px) {
    display: none;
  }
`;

export const Account = styled.div`
  display: none;
  @media only screen and (min-width: 1300px) {
    display: flex;
    align-items: center;
    color: ${theme.color.white};
    font-size: 18px;
    position: relative;
    top: -5px;
    & > div {
      display: flex;
      align-items: center;
      cursor: pointer;
      & > span {
        margin-right: 8px;
        color: ${theme.color.grey};
      }
      & > img {
        width: 28px;
        margin-left: 11px;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  @media only screen and (min-width: 1300px) {
    justify-content: flex-start;
  }
`;

const blink = keyframes`
  0% {
        color: ${theme.color.white};
    }
    50% {
        color: #db045a;
    }
    100% {
        color: ${theme.color.white};
    }
`;

export const NavList = styled.div`
  display: none;
  @media only screen and (min-width: 1300px) {
    display: flex;
    align-items: center;
    & > a {
      font-size: 21px;
      color: ${theme.color.white};
      margin: 0 24px;
      padding-bottom: 8px;
      cursor: pointer;
      transition: ${theme.transition};
      border-bottom: 3px solid transparent;
      &:hover {
        color: ${theme.color.green};
        border-bottom: 3px solid ${theme.color.green};
      }
    }
    & > a.flash {
      font-size: 21px;
      color: ${theme.color.red};
      margin: 0 24px;
      padding-bottom: 8px;
      cursor: pointer;
      transition: ${theme.transition};
      border-bottom: 3px solid transparent;
      animation: 2s ${blink} infinite;
      &:hover {
        color: ${theme.color.green};
        border-bottom: 3px solid ${theme.color.green};
      }
    }
    & > a.active {
      color: ${theme.color.green};
      border-bottom: 3px solid ${theme.color.green};
    }
  }
`;

export const Menu = styled.div`
  color: ${theme.color.white};
  cursor: pointer;
  & > span > svg {
    font-size: 30px;
  }
  @media only screen and (min-width: 1300px) {
    display: none;
  }
`;
