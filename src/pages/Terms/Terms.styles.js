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
    margin-top: 205px;
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
    width: 1028px;
    margin: 0 auto;
    padding: 54px;
  }
`;

export const TitleBox = styled.div`
  h4 {
    color: ${theme.color.white};
    text-align: center;
    font-size: 24px;
    margin-top: 0;
    line-height: 31px;
    margin-bottom: 16px;
  }
  @media only screen and (min-width: 1024px) {
    h4 {
      text-align: left;
      font-size: 38px;
      line-height: 49px;
      margin-bottom: 24px;
    }
  }
`;

export const TermsContent = styled.div`
  h3 {
    color: ${theme.color.whiteGrey};
    font-size: 20px;
  }
  p {
    color: ${theme.color.whiteGrey};
    font-size: 14px;
  }
  @media only screen and (min-width: 1024px) {
    h3 {
      font-size: 24px;
    }
    p {
      font-size: 16px;
    }
  }
`;
