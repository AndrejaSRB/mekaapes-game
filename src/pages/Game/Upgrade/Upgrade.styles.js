import styled from "styled-components";
// ******** Theme ********
import * as theme from "../../../theme";
// ******** Image ********
import BackgroundImage from "../../../assets/background.png";

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
    margin-top: 150px;
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
  position: relative;
  background: ${theme.boxBackground};
  border: 10px solid ${theme.color.borderColor};
  border-radius: 50px;
  padding: 54px 14px;
  @media only screen and (min-width: 1024px) {
    padding: 64px 20px;
    display: flex;
    flex-wrap: wrap;
  }
  @media only screen and (min-width: 1300px) {
    margin: 0 16px;
    padding: 54px;
  }
  @media only screen and (min-width: 1320px) {
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
    width: 100%;
    h4 {
      font-size: 38px;
      line-height: 49px;
      margin-bottom: 24px;
    }
    h6 {
      font-size: 18px;
      line-height: 1.5;
      margin-top: 42px;
      width: 900px;
      margin: 0 auto 38px auto;
    }
  }
`;

export const ButtonBox = styled.div`
  text-align: center;
  margin-top: 24px;
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
  line-height: 1.5;
  text-align: center;
  margin-top: 16px;
  margin-bottom: 0;
  span {
    display: block;
  }
  a {
    color: ${theme.color.red};
    transition: ${theme.transition};
    font-weight: bold;
    padding-left: 5px;
    &:visited {
      color: ${theme.color.red};
    }
    &:hover {
      color: ${theme.color.green};
    }
  }
  @media only screen and (min-width: 789px) {
    margin-top: 24px;
  }
  @media only screen and (min-width: 1200px) {
    font-size: 18px;
  }
`;

export const LevelBoxContainer = styled.div`
  min-height: 80px;
`;

export const LevelBoxWrapper = styled.div`
  width: 80px;
  height: 80px;
  -webkit-box-shadow: 0px 0px 40px #11051b;
  box-shadow: 0px 0px 40px #11051b;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: ${({ currentLvl }) => {
    if (currentLvl) {
      return `5px solid ${theme.color.level[currentLvl]}`;
    } else {
      return `none`;
    }
  }};
  span {
    font-size: 18px;
    line-height: 1;
    text-transform: uppercase;
  }
  p {
    margin: 0;
    font-weight: bold;
    font-size: 45px;
    line-height: 1;
  }
`;

export const LeftSide = styled.div`
  color: ${theme.color.white};
  display: none;
  @media only screen and (min-width: 1024px) {
    padding-right: 20px;
    width: calc((100% - 380px) / 2);
    display: flex;
    flex-direction: column;
    align-items: center;
    h6 {
      margin: 24px 0 16px 0;
      font-size: 21px;
      color: ${theme.color.white};
    }
  }
`;
export const Middle = styled.div`
  @media only screen and (min-width: 1024px) {
    width: 380px;
  }
`;
export const RightSide = styled.div`
  color: ${theme.color.white};
  display: none;
  @media only screen and (min-width: 1024px) {
    padding-left: 20px;
    width: calc((100% - 380px) / 2);
    display: flex;
    flex-direction: column;
    align-items: center;
    h6 {
      margin: 24px 0 16px 0;
      font-size: 21px;
      color: ${theme.color.white};
    }
  }
`;

export const ApeBox = styled.div`
  text-align: center;
`;

export const Ape = styled.div`
  width: 160px;
  height: 160px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  -webkit-box-shadow: 0px 0px 40px #11051b;
  box-shadow: 0px 0px 40px #11051b;
  border-radius: 15px;
  overflow: hidden;
  border: ${({ currentLvl }) => {
    if (currentLvl) {
      return `5px solid ${theme.color.level[currentLvl]}`;
    } else {
      return `none`;
    }
  }};
  cursor: pointer;
  img {
    width: 160px;
    height: 160px;
  }
  p {
    position: absolute;
    color: ${theme.color.white};
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 20px;
    margin: 0;
    span {
      display: block;
      width: 100%;
      text-align: center;
    }
  }
  @media only screen and (min-width: 1024px) {
    width: 180px;
    height: 180px;
    p {
      font-size: 28px;
    }
    img {
      width: 180px;
      height: 180px;
    }
  }
`;

export const Name = styled.div`
  font-weight: 600;
  color: ${theme.color.white};
  font-size: 18px;
  text-align: center;
  margin-top: 24px;
  @media only screen and (min-width: 1024px) {
    font-size: 21px;
    margin-top: 32px;
  }
`;

export const LevelList = styled.ul`
  list-style: inside;
  li {
    color: ${theme.color.whiteGrey};
    font-size: 18px;
    line-height: 23px;
  }
`;

export const InfoIcon = styled.div`
  width: 30px;
  height: 30px;
  color: ${theme.color.white};
  background: ${theme.color.green};
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 21px;
  position: absolute;
  right: 15px;
  top: 10px;
  cursor: pointer;
  transition: ${theme.transition};
  &:hover {
    background: ${theme.color.white};
    svg {
      color: ${theme.color.green};
    }
  }
  @media only screen and (min-width: 1024px) {
    width: 64px;
    height: 64px;
    font-size: 38px;
    top: 54px;
    right: 90px;
  }
`;
