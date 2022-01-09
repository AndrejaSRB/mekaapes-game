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
  @media only screen and (min-width: 1100px) {
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

export const WhitepaperContent = styled.div`
  color: ${theme.color.whiteGrey};
  p {
    font-size: 14px;
    line-height: 20px;
    margin-top: 0;
    margin-bottom: 16px;
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
    @media only screen and (min-width: 1024px) {
      font-size: 18px;
      line-height: 23px;
    }
  }
  h4 {
    color: ${theme.color.white};
    font-size: 20px;
    @media only screen and (min-width: 1024px) {
      font-size: 28px;
    }
  }
  h5 {
    color: ${theme.color.white};
    margin-bottom: 0;
    font-size: 16px;
    @media only screen and (min-width: 1024px) {
      font-size: 20px;
    }
  }
  ul {
    list-style-type: circle;
    padding-left: 20px;
    li {
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
    @media only screen and (min-width: 1024px) {
      padding-left: 40px;
    }
  }
`;

export const Separator = styled.div`
  text-align: center;
  font-size: 30px;
  color: ${theme.color.white};
  margin: 24px 0;
  line-height: 1;
  span {
    padding: 0 8px;
  }
`;

export const BoxImage = styled.div`
  text-align: center;
  margin: 24px 0;
  img {
    width: 100%;
  }
  @media only screen and (min-width: 1024px) {
    margin: 32px 0;
  }
`;

export const BoxLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 32px;
  margin-bottom: 48px;
  @media only screen and (min-width: 900px) {
    flex-direction: row;
    margin-bottom: 64px;
  }
`;

export const Image = styled.div`
  margin-bottom: 16px;
  img {
    width: 150px;
    height: 150px;
    border-radius: 15px;
    -webkit-filter: drop-shadow(0px 0px 40px #11051b);
    filter: drop-shadow(0px 0px 40px #11051b);
  }
  @media only screen and (min-width: 900px) {
    margin-bottom: 0;
    padding-right: 50px;
    position: relative;
    top: -80px;
    width: 30%;
    img {
      width: 200px;
      height: 200px;
    }
  }
  @media only screen and (min-width: 1024px) {
    img {
      width: 215px;
      height: 215px;
    }
  }
`;

export const BoxText = styled.div`
  line-height: 1.5;
  h4 {
    text-align: center;
  }
  p {
    margin-bottom: 24px;
    padding: 0 14px;
    padding-left: 0;
  }
  @media only screen and (min-width: 900px) {
    width: 70%;
    h4 {
      text-align: left;
    }
  }
`;

export const SmallTable = styled.div`
  background: #292c45;
  border: 5px solid ${theme.color.green};
  box-sizing: border-box;
  border-radius: 15px;
  padding: 14px;
  -webkit-box-shadow: 0px 0px 40px #11051b;
  box-shadow: 0px 0px 40px #11051b;
  .cell {
    border: none;
    display: flex;
    align-items: center;
    padding-bottom: 8px;
    margin-bottom: 8px;
    border-bottom: 1px solid ${theme.color.whiteGrey};
    &:last-child {
      border-bottom: 0;
    }
  }
  span {
    color: ${theme.color.white};
    font-size: 18px;
    font-weight: 600;
    width: 161px;
    display: block;
    width: 45%;
  }
  span.align-self {
    align-self: flex-start;
  }
  p {
    margin-bottom: 0;
    padding: 0;
    font-size: 14px;
    width: 55%;
  }
  @media only screen and (min-width: 1024px) {
    padding: 24px;
    span {
      font-size: 21px;
    }
    p {
      font-size: 16px;
    }
  }
`;

export const BoxContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 32px;
  margin-bottom: 48px;
  flex-wrap: wrap;
  @media only screen and (min-width: 900px) {
    flex-direction: row;
    margin-bottom: 64px;
  }
`;

export const Headline = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  .content {
    p {
      font-size: 16px;
      line-height: 21px;
    }
    ul {
      li {
        font-size: 16px;
        line-height: 21px;
        padding-bottom: 8px;
        span {
          color: ${theme.color.white};
        }
      }
    }
  }
  .image {
    margin-top: 16px;
    margin-bottom: 16px;
    text-align: center;
    img {
      width: 150px;
      height: 150px;
      border-radius: 15px;
      -webkit-filter: drop-shadow(0px 0px 40px #11051b);
      filter: drop-shadow(0px 0px 40px #11051b);
    }
  }
  .image.desktop {
    display: none;
  }
  .content.full {
    width: 100%;
    margin-bottom: 16px;
  }
  @media only screen and (min-width: 900px) {
    .image {
      img {
        width: 200px;
        height: 200px;
      }
    }
  }
  @media only screen and (min-width: 1024px) {
    flex-direction: row;
    .content {
      width: 70%;
      p {
        font-size: 18px;
        line-height: 23px;
      }
      ul {
        li {
          font-size: 18px;
        }
      }
    }
    .content.full {
      width: 100%;
      margin-bottom: 24px;
    }
    .image {
      margin-top: 0;
      text-align: right;
      width: 30%;
      margin-bottom: 24px;
    }
    .image.desktop {
      display: block;
      text-align: left;
    }
    .image.mobile {
      display: none;
    }
  }
`;

export const Table = styled.div`
  overflow-y: scroll;
  width: 100%;
  @media only screen and (min-width: 1024px) {
    overflow-y: hidden;
  }
`;

export const LogoWrapper = styled.div`
  text-align: center;
  width: 80%;
  margin: 0 auto;
  @media only screen and (min-width: 1024px) {
    width: 548px;
    margin: 0 auto 64px auto;
  }
`;
