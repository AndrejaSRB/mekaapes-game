import styled from "styled-components";
// ******** Theme ********
import * as theme from "../../theme";
// ******** Image ********
import BackgroundImage from "../../assets/background.png";

export const Wrapper = styled.div`
  background-image: url(${BackgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: right;
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

export const WhitepaperContent = styled.div`
  color: ${theme.color.whiteGrey};
  p {
    font-size: 14px;
    line-height: 20px;
    margin-top: 0;
    margin-bottom: 16px;
    word-break: break-all;
    @media only screen and (min-width: 1024px) {
      font-size: 16px;
      line-height: 23px;
    }
  }
  h4 {
    color: ${theme.color.white};
  }
  ul {
    list-style-type: circle;
    padding-left: 40px;
    li {
      word-break: break-all;
    }
  }
`;

export const BoxLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 32px;
  @media only screen and (min-width: 900px) {
    flex-direction: row;
  }
`;

export const Image = styled.div`
  img {
    width: 150px;
    height: 150px;
    border-radius: 15px;
    filter: drop-shadow(0px 0px 10px #11051b);
  }
  @media only screen and (min-width: 900px) {
    padding-right: 50px;
    position: relative;
    top: -25px;
    width: 30%;
  }
  @media only screen and (min-width: 1024px) {
    img {
      width: 215px;
      height: 215px;
    }
  }
`;

export const BoxText = styled.div`
  margin-top: 16px;
  line-height: 24px;
  p {
    border: 5px solid ${theme.color.green};
    box-shadow: 0px 0px 40px #11051b;
    border-radius: 15px;
    padding: 12px;
    span {
      color: ${theme.color.white};
      font-weight: 600;
    }
  }
  p.box {
    background: #292c45;
  }
  @media only screen and (min-width: 900px) {
    margin-top: 48px;
    width: 70%;
  }
  @media only screen and (min-width: 1024px) {
    p {
      padding: 24px;
    }
  }
`;

export const BoxSubText = styled.div`
  p {
    border: none;
    padding: 0;
    margin-top: 0;
    margin-bottom: 16px;
    line-height: 24px;
  }
`;

export const BoxRight = styled.div`
  border: 5px solid ${theme.color.green};
  box-shadow: 0px 0px 40px #11051b;
  border-radius: 15px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #292c45;
  margin: 24px 0;
  .image {
    img {
      width: 150px;
      height: 150px;
      border-radius: 15px;
      filter: drop-shadow(0px 0px 10px #11051b);
    }
  }
  @media only screen and (min-width: 900px) {
    flex-direction: row;
    justify-content: space-between;
    .text {
        width: 75%;
    }
    .image {
        text-align: right;
        width: 25%;
        padding-left: 10px;
    }
  }
  @media only screen and (min-width: 1024px) {
    padding: 24px;
    .image {
      img {
        width: 170px;
        height: 170px;
      }
    }
  }
`;

export const AnimationBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 24px;
  img {
    width: 150px;
    height: 150px;
    border-radius: 15px;
    filter: drop-shadow(0px 0px 10px #11051b);
  }
  p {
    margin-top: 48px;
    font-size: 21px;
    color: ${theme.color.white};
    text-align: center;
    font-weight: 600;
  }
  @media only screen and (min-width: 1024px) {
    img {
      width: 215px;
      height: 215px;
    }
    p {
      font-size: 38px;
      color: ${theme.color.white};
      text-align: center;
      font-weight: 600;
    }
  }
`;
