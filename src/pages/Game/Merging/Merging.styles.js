import styled from "styled-components";
// ******** Theme ********
import * as theme from "../../../theme";
// ******** Image ********
import BackgroundImage from "../../../assets/background.jpg";
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
    width: 1300px;
    margin: 0 auto;
    padding: 54px;
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

export const MergingBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 250px;
  margin: 0 auto 64px auto;
  img {
    width: 30px;
  }
  @media only screen and (min-width: 789px) {
    max-width: 542px;
    margin-bottom: 100px;
    img {
        width: 58px;
    }
  }
`;

export const Box = styled.div`
  width: 80px;
  height: 80px;
  position: relative;
  cursor: pointer;
  img {
    width: 80px;
    height: 80px;
    box-shadow: 0px 0px 40px #11051b;
    border-radius: 15px;
  }
  span {
    position: absolute;
    color: ${theme.color.white};
    font-size: 24px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  p {
    position: absolute;
    color: ${theme.color.white};
    font-size: 16px;
    left: 50%;
    bottom: -34px;
    transform: translate(-50%);
    margin: 0;
  }
  @media only screen and (min-width: 789px) {
    width: 200px;
    height: 200px;
    img {
      width: 200px;
      height: 200px;
    }
    span {
      font-size: 38px;
    }
    p {
      font-size: 28px;
      bottom: -64px;
    }
  }
`;

export const ButtonBox = styled.div`
  text-align: center;
  button {
    background: ${theme.color.red};
    transition: ${theme.transition};
    cursor: pointer;
    border: none;
    color: ${theme.color.white};
    border-radius: 400px;
    height: 80px;
    width: 240px;
    font-size: 18px;
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
      font-size: 21px;
    }
    @media only screen and (min-width: 1200px) {
      width: 388px;
    }
  }
`;

export const HelperText = styled.p`
  color: ${theme.color.whiteGrey};
  font-size: 16px;
  line-height: 21px;
  text-align: center;
  margin-top: 16px;
  margin-bottom: 0;
  span {
    display: block;
  }
  @media only screen and (min-width: 789px) {
    margin-top: 24px;
  }
  @media only screen and (min-width: 1200px) {
    font-size: 18px;
  }
`;
