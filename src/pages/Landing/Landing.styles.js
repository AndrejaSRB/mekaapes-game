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
  @media only screen and (min-width: 1300px) {
    padding: 0 16px;
  }
  @media only screen and (min-width: 1320px) {
    padding: 0;
  }
`;

export const LogoImage = styled.div`
  margin-top: 64px;
  margin-bottom: 16px;
  text-align: center;
  img {
    height: 60px;
  }
  @media only screen and (min-width: 769px) {
    img {
      height: 100px;
    }
  }
  @media only screen and (min-width: 1024px) {
    margin-bottom: 45px;
    margin-top: 100px;
    img {
      height: 140px;
    }
  }
  @media only screen and (min-width: 1300px) {
    margin-top: 150px;
  }
  @media only screen and (min-width: 1520px) {
    margin-top: 190px;
  }
`;

export const Title = styled.h1`
  color: ${theme.color.white};
  text-align: center;
  margin-top: 64px;
  margin-bottom: 16px;
  line-height: 1;
  font-size: 28px;
  & > span {
    display: block;
    width: 100%;
    color: ${theme.color.red};
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
  display: flex;
  flex-direction: column-reverse;
  & > .desktop {
    display: none;
  }
  & > .mobile {
    color: ${theme.color.white};
    margin: 0 0 16px 0;
    font-size: 24px;
    text-align: center;
    line-height: 1;
  }
  @media only screen and (min-width: 1024px) {
    padding: 64px 20px;
    flex-direction: column;
    & > .mobile {
      display: none;
    }
    & > .desktop {
      display: block;
      color: ${theme.color.white};
      margin-bottom: 24px;
      font-size: 38px;
      text-align: center;
    }
  }
  @media only screen and (min-width: 1300px) {
    padding: 54px 54px 0 54px;
  }
  @media only screen and (min-width: 1350px) {
    width: 1300px;
    margin: 0 auto;
    padding: 54px 54px 0 54px;
  }
`;

export const IntroText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & > div {
    text-align: center;
    color: ${theme.color.whiteGrey};
    p {
      font-size: 16px;
      line-height: 21px;
      margin: 0 0 8px 0;
      a {
        color: ${theme.color.red};
        transition: ${theme.transition};
        cursor: pointer;
        font-weight: 600;
        &:visited {
          color: ${theme.color.red};
        }
        &:hover {
          color: ${theme.color.green};
        }
      }
    }
  }
  @media only screen and (min-width: 900px) {
    & > div > p {
      width: 660px;
      margin: 0 auto 8px auto;
    }
  }
  @media only screen and (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
    & > div > p {
      font-size: 18px;
      line-height: 27px;
      width: 290px;
      &:first-child {
        margin-bottom: 16px;
      }
      & > span {
        display: block;
      }
    }
    & > div:first-child {
      text-align: left;
    }
    & > div:last-child {
      text-align: right;
    }
  }
`;

export const BottomContent = styled.div`
  @media only screen and (min-width: 1024px) {
    position: relative;
    top: -110px;
  }
`;

export const HeroImage = styled.div`
  width: 172px;
  margin: 26px auto;
  text-align: center;
  & > img {
    width: 100%;
    border-radius: 30px;
    -webkit-filter: drop-shadow(0px 0px 40px #11051b);
    filter: drop-shadow(0px 0px 40px #11051b);
  }
  @media only screen and (min-width: 1024px) {
    width: 215px;
  }
`;

export const Text = styled.p`
  text-align: center;
  color: ${theme.color.whiteGrey};
  font-size: 18px;
  line-height: 23px;
  margin-bottom: 32px;
  @media only screen and (min-width: 900px) {
    width: 660px;
    margin: 0 auto 32px auto;
    line-height: 1.5
  }
`;

export const ButtonWrapper = styled.div`
  text-align: center;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  & > a {
    background-color: ${theme.color.red};
    color: ${theme.color.white};
    border: none;
    position: relative;
    z-index: 1;
    cursor: pointer;
    width: 240px;
    height: 80px;
    margin: 0 auto 32px auto;
    font-size: 21px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 400px;
  }
  @media only screen and (min-width: 789px) {
    & > a {
      width: 660px;
      transition: ${theme.transition};
      &:hover {
        background-color: ${theme.color.redHover};
      }
    }
  }
`;

export const BoxesWrapper = styled.div`
  margin-top: 32px;
  @media only screen and (min-width: 680px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  @media only screen and (min-width: 1320px) {
    width: 1300px;
    margin: 32px auto 0 auto;
  }
`;

export const Box = styled.div`
  background: ${theme.boxBackground};
  border: 10px solid ${theme.color.borderColor};
  border-radius: 50px;
  padding: 54px 14px;
  text-align: center;
  color: ${theme.color.white};
  margin-bottom: 32px;
  & > h5 {
    font-size: 24px;
    color: ${theme.color.white};
    line-height: 1;
  }
  & > img {
    margin: 24px 0 25px 0;
    border-radius: 20px;
    -webkit-filter: drop-shadow(0px 0px 40px #11051b);
    filter: drop-shadow(0px 0px 40px #11051b);
    width: 168px;
  }
  & > p {
    color: ${theme.color.whiteGrey};
    margin-bottom: 0;
  }
  @media only screen and (min-width: 680px) {
    width: 303px;
  }
  @media only screen and (min-width: 1024px) {
    & > h5 {
      font-size: 38px;
    }
    & > p {
      font-size: 18px;
      a {
        color: ${theme.color.red};
        transition: ${theme.transition};
        cursor: pointer;
        font-weight: 600;
        &:visited {
          color: ${theme.color.red};
        }
        &:hover {
          color: ${theme.color.green};
        }
      }
    }
    & > p.width {
      width: 235px;
      margin: 0 auto;
    }
    & > p.small-width {
      width: 225px;
      margin: 0 auto;
      span {
        width: 100%;
      }
    }
    & > img {
      width: 175px;
    }
  }
`;
