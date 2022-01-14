import styled from "styled-components";
// ******** Theme ********
import * as theme from "../../../theme";
// ******** Image ********
import BackgroundImage from "../../../assets/background.png";
// ******** Components ********
import { Checkbox } from "antd";

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
    margin: 0 16px;
    padding: 54px;
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
  @media only screen and (min-width: 1024px) {
    h4 {
      font-size: 38px;
      line-height: 49px;
      margin-bottom: 24px;
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
  @media only screen and (min-width: 789px) {
    margin-top: 24px;
  }
  @media only screen and (min-width: 1200px) {
    font-size: 18px;
  }
`;

export const ApesBox = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  height: 384px;
  max-width: 350px;
  overflow-y: scroll;
  margin: 0 auto 32px auto;
  @media only screen and (min-width: 900px) {
    max-width: 550px;
    justify-content: ${({ length }) => (length > 3 ? "flex-start" : "center")};
  }
  @media only screen and (min-width: 1200px) {
    max-width: 1080px;
    height: 253px;
    justify-content: ${({ length }) => (length > 8 ? "flex-start" : "center")};
  }
`;

export const Ape = styled.div`
  margin: 8px;
  width: 80px;
  height: 80px;
  cursor: ${({ placeholder }) => (placeholder ? "default" : "pointer")};
  @media only screen and (min-width: 900px) {
    width: 110px;
    height: 110px;
  }
`;

export const ApeImage = styled.img`
  width: 80px;
  height: 80px;
  -webkit-filter: drop-shadow(0px 0px 40px #11051b);
  filter: drop-shadow(0px 0px 10px #11051b);
  border: ${({ selected }) =>
    selected ? `5px solid ${theme.color.green}` : `5px solid transparent`};
  border-radius: 15px;
  opacity: ${({ active }) => (active ? 1 : 0.3)};
  @media only screen and (min-width: 900px) {
    width: 110px;
    height: 110px;
  }
`;

export const SubtitleBox = styled.div`
  color: ${theme.color.whiteGrey};
  display: flex;
  flex-direction: column;
  align-items: center;
  @media only screen and (min-width: 900px) {
    flex-direction: row;
    justify-content: space-between;
    max-width: 550px;
    margin: 0 auto 12px auto;
    p {
      font-size: 21px;
      width: 50%;
      margin-bottom: 0;
    }
  }
  @media only screen and (min-width: 1200px) {
    max-width: 1080px;
  }
`;

export const CustomCheckbox = styled(Checkbox)`
  color: ${theme.color.whiteGrey};
  flex-direction: row-reverse;
  font-size: 16px;
  justify-content: center;
  align-items: flex-start;
  span:first-child {
    border-radius: 5px;
    background: transparent;
  }
  span:first-child.ant-checkbox-checked {
    span.ant-checkbox-inner {
      background-color: ${theme.color.green};
      border-color: ${theme.color.green};
    }
  }
  margin: 0 auto 8px auto;
  @media only screen and (min-width: 900px) {
    margin: 0;
    justify-content: flex-start;
  }
`;

export const Box = styled.div`
  @media only screen and (min-width: 1300px) {
    display: flex;
  }
`;
export const LeftSide = styled.div`
  display: none;
  @media only screen and (min-width: 1300px) {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 62px;
  }
`;

export const Animation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    border-radius: 30px;
    -webkit-filter: drop-shadow(0px 0px 40px #11051b);
    filter: drop-shadow(0px 0px 40px #11051b);
    height: 280px;
    position: relative;
    top: -15px;
  }
`;

export const RightSide = styled.div``;
