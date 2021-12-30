import styled from "styled-components";
// ******** Theme ********
import * as theme from "../../../theme";
// ******** Image ********
import BackgroundImage from "../../../assets/background.png";
// ******** Components ********

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
  font-size: 28px;
  line-height: 36px;
  text-transform: uppercase;
  & > span {
    display: block;
    width: 100%;
  }
  @media only screen and (min-width: 650px) {
    & > span {
      display: inline;
    }
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
    margin-bottom: 96px;
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
  @media only screen and (min-width: 1024px) {
    padding: 64px 20px;
  }
  @media only screen and (min-width: 1300px) {
    padding: 54px;
    margin: 0 16px;
  }
  @media only screen and (min-width: 1320px) {
    width: 1300px;
    margin: 0 auto;
  }
`;

export const TitleBox = styled.div`
  text-align: center;
  h4 {
    color: ${theme.color.white};
    font-size: 24px;
    margin-top: 0;
    line-height: 31px;
    margin-bottom: 16px;
  }
  h6 {
    color: ${theme.color.whiteGrey};
    font-size: 16px;
    margin-top: 0;
    line-height: 21px;
    margin-bottom: 27px;
  }
  @media only screen and (min-width: 1024px) {
    h4 {
      font-size: 38px;
      line-height: 49px;
      margin-bottom: 24px;
    }
    h6 {
      font-size: 18px;
      line-height: 49px;
      margin-bottom: 38px;
    }
  }
`;

export const OogearBox = styled.div``;

export const Counter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.color.white};
  margin-bottom: 40px;
  .number {
    margin: 0 40px;
    font-size: 48px;
    color: ${theme.color.white};
  }
  .minus {
    border-radius: 100%;
    border: 5px solid ${theme.color.green};
    width: 45px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: ${theme.transition};
    cursor: pointer;
    &:hover {
      background: ${theme.color.green};
    }
  }
  .minus.disabled {
    cursor: not-allowed;
    &:hover {
      background: transparent;
    }
  }
  .plus {
    border-radius: 100%;
    border: 5px solid ${theme.color.green};
    width: 45px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: ${theme.transition};
    cursor: pointer;
    &:hover {
      background: ${theme.color.green};
    }
  }
  .plus.disabled {
    cursor: not-allowed;
    &:hover {
      background: transparent;
    }
  }
  @media only screen and (min-width: 1200px) {
    .plus,
    .minus {
      width: 64px;
      height: 64px;
      span > svg {
        font-size: 30px;
      }
    }
  }
`;

export const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  button {
    background: ${theme.color.red};
    transition: ${theme.transition};
    cursor: pointer;
    border: none;
    color: ${theme.color.white};
    border-radius: 400px;
    height: 80px;
    width: 240px;
    font-size: 21px;
    &:hover {
      background: ${theme.color.redHover};
    }
    &:disabled {
      color: ${theme.color.white};
      border: 1px solid #ffffff;
      background: ${theme.color.secondButton};
      cursor: not-allowed;
    }
  }
  button:last-child {
    margin-top: 32px;
  }
  @media only screen and (min-width: 600px) {
    button {
      width: 380px;
    }
  }
  @media only screen and (min-width: 1200px) {
    flex-direction: row;
    button {
      width: 214px;
    }
    button:last-child {
      margin-top: 0;
      margin-left: 32px;
    }
  }
`;

export const HelperText = styled.p`
  margin-top: 16px;
  margin-bottom: 0;
  color: ${theme.color.white};
  font-size: 18px;
  line-height: 23px;
  text-align: center;
  span {
    display: block;
    color: ${theme.color.whiteGrey};
    margin-top: 7px;
  }
  @media only screen and (min-width: 1200px) {
    font-size: 21px;
    span {
      display: inline;
      padding-left: 24px;
    }
  }
`;

export const DmtBox = styled.div`
  margin-top: 76px;
  text-align: center;
  @media only screen and (min-width: 1024px) {
    margin-top: 0px;
  }
`;

export const Button = styled.button`
  background: ${theme.color.red};
  transition: ${theme.transition};
  cursor: pointer;
  border: none;
  color: ${theme.color.white};
  border-radius: 400px;
  height: 80px;
  width: 240px;
  font-size: 21px;
  &:hover {
    background: ${theme.color.redHover};
  }
  &:disabled {
    color: ${theme.color.white};
    border: 1px solid #ffffff;
    background: ${theme.color.secondButton};
    cursor: not-allowed;
  }
  @media only screen and (min-width: 600px) {
    width: 380px;
  }
  @media only screen and (min-width: 1200px) {
    width: 388px;
  }
`;

export const Text = styled.p`
  color: ${theme.color.whiteGrey};
  font-size: 16px;
  line-height: 21px;
  text-align: center;
  margin-top: 32px;
  margin-bottom: 0;
`;

export const CounterBox = styled.div`
  @media only screen and (min-width: 1024px) {
    display: flex;
    justify-content: space-between;
  }
`;

export const AnimationBox = styled.div`
  text-align: center;
  margin-bottom: 32px;
  img {
    border-radius: 30px;
    filter: drop-shadow(0px 0px 40px #11051b);
    width: 160px;
    height: 160px;
  }
  @media only screen and (min-width: 1024px) {
    img {
      width: 220px;
      height: 220px;
    }
  }
`;
