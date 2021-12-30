import styled from "styled-components";
// ******** Theme ********
import * as theme from "../../theme";
// ******** Image ********
import BackgroundImage from "../../assets/background.png";

export const Wrapper = styled.div`
  background-image: url(${BackgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;
`;

export const Title = styled.h1`
  color: ${theme.color.white};
  text-align: center;
  margin-top: 64px;
  margin-bottom: 16px;
  line-height: 1;
  font-size: 28px;
  text-transform: uppercase;
  span {
    color: ${theme.color.red};
  }
  @media only screen and (min-width: 1024px) {
    font-size: 52px;
    margin-bottom: 45px;
    margin-top: 100px;
  }
  @media only screen and (min-width: 1300px) {
    margin-top: 150px;
  }
  @media only screen and (min-width: 1520px) {
    margin-top: 285px;
  }
`;

export const Content = styled.div`
  padding: 0 16px;
  margin-bottom: 32px;
  @media only screen and (min-width: 1024px) {
    margin-bottom: 128px;
  }
  @media only screen and (min-width: 1300px) {
    padding-left: 0px;
    padding-right: 0px;
  }
`;

export const MainBox = styled.div`
  background: ${theme.boxBackground};
  border: 10px solid ${theme.color.borderColor};
  border-radius: 50px;
  padding: 54px 14px;
  & > h4 {
    color: ${theme.color.white};
    margin: 0 0 16px 0;
    font-size: 24px;
    text-align: center;
    line-height: 1;
    span {
      display: block;
      margin-top: 16px;
      line-height: 28px;
    }
  }
  @media only screen and (min-width: 1024px) {
    padding: 64px 20px;
    & > h4 {
      color: ${theme.color.white};
      margin-bottom: 24px;
      font-size: 38px;
    }
  }
  @media only screen and (min-width: 1300px) {
    padding: 54px 54px 0 54px;
    margin: 0 16px;
  }
  @media only screen and (min-width: 1320px) {
    width: 1300px;
    margin: 0 auto;
  }
`;

export const IntroText = styled.p`
  color: ${theme.color.whiteGrey};
  text-align: center;
  @media only screen and (min-width: 790px) {
    width: 768px;
    margin: 0 auto;
    & > span {
      display: block;
    }
  }
  @media only screen and (min-width: 1024px) {
    font-size: 18px;
  }
`;

export const ButtonWrapper = styled.div`
  text-align: center;
  margin-top: 33px;
  & > button {
    background-color: ${theme.color.red};
    color: ${theme.color.white};
    border: none;
    cursor: pointer;
    width: 240px;
    height: 80px;
    margin: 0 auto 16px auto;
    font-size: 21px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 400px;
    transition: ${theme.transition};
    &:hover {
      background-color: ${theme.color.redHover};
    }
    &:disabled {
      color: ${theme.color.white};
      border: 1px solid #ffffff;
      background: ${theme.color.secondButton};
      cursor: not-allowed;
    }
  }
  & > button.orange {
    background-color: #f5811b;
    transition: ${theme.transition};

    &:hover {
      background-color: #ff851c;
    }
    &:disabled {
      color: ${theme.color.white};
      border: 1px solid #ffffff;
      background: ${theme.color.secondButton};
      cursor: not-allowed;
    }
  }
  @media only screen and (min-width: 789px) {
    & > button {
      width: 660px;
    }
    & > button.orange {
      width: 560px;
    }
  }
`;

export const Counter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  margin-bottom: 5px;
  .icon {
    height: 45px;
    width: 45px;
    border-radius: 400px;
    border: 5px solid ${theme.color.green};
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    cursor: pointer;
    transition: ${theme.transition};
    svg {
      color: ${theme.color.white};
      font-size: 21px;
      font-weight: 600;
    }
    &:hover {
      background: ${theme.color.green};
    }
  }
  .icon.disabled {
    cursor: not-allowed;
    &:hover {
      background: transparent;
    }
  }
  .number {
    color: ${theme.color.white};
    font-size: 48px;
    font-weight: 600;
    padding: 0 32px;
    line-height: 1;
  }
  @media only screen and (min-width: 789px) {
    margin-top: 48px;
    .icon {
      height: 64px;
      width: 64px;
      svg {
        font-size: 30px;
      }
    }
    .number {
      font-size: 62px;
    }
  }
`;

export const Price = styled.div`
  text-align: center;
  color: ${theme.color.whiteGrey};
  margin-bottom: ${({ margin }) => (margin ? "54px" : "32px")};
  font-size: 18px;
  font-weight: 600;
  span {
    color: ${theme.color.white};
    display: block;
  }
  @media only screen and (min-width: 789px) {
    font-size: 21px;
    span {
      display: inline-block;
      margin-right: 15px;
    }
  }
`;
