import styled from "styled-components";
// ******** Theme ********
import * as theme from "../../../theme";
// ******** Components ********
import { Checkbox } from "antd";

export const Wrapper = styled.div``;

export const MainBox = styled.div`
  background: ${theme.boxBackground};
  border: 10px solid ${theme.color.borderColor};
  border-radius: 50px;
  padding: 54px 14px;
  h4 {
    color: ${theme.color.white};
    margin: 0 0 16px 0;
    font-size: 24px;
    text-align: center;
    line-height: 1;
  }
  h6 {
    line-height: 1;
    text-align: center;
    color: ${theme.color.whiteGrey};
    font-size: 16px;
    margin-bottom: 27px;
  }
  @media only screen and (min-width: 900px) {
    padding: 64px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h4 {
      color: ${theme.color.white};
      margin-bottom: 16px;
      font-size: 38px;
      width: 100%;
    }
    h6 {
      font-size: 18px;
      width: 100%;
    }
  }
  @media only screen and (min-width: 900px) {
    width: 772px;
    margin: 0 auto;
  }
  @media only screen and (min-width: 1200px) {
    width: 100%;
    margin: 0 auto;
  }
  @media only screen and (min-width: 1320px) {
    width: 1300px;
    margin: 0 auto;
    padding: 54px;
  }
`;

export const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Boxes = styled.div`
  display: flex;
  /* min-height: 630px; */
  max-height: 630px;
  overflow-x: scroll;
  margin-top: 32px;
  flex-wrap: wrap;
  justify-content: center;
  @media only screen and (min-width: 900px) {
    width: 660px;
    margin: 32px auto 0 auto;
    justify-content: flex-start;
  }
  @media only screen and (min-width: 1200px) {
    width: 1000px;
    margin: 32px auto 0 auto;
  }
`;

export const Box = styled.div`
  width: 180px;
  height: 200px;
  border: ${({ active }) =>
    active ? `5px solid ${theme.color.green}` : "5px solid #3a4662"};
  padding: 15px 0 0 0;
  color: ${theme.color.white};
  border-radius: 15px;
  margin-bottom: 32px;
  cursor: pointer;
  transition: all 0.4s;
  margin-right: 16px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  &:hover {
    border: 5px solid ${theme.color.green};
  }

  @media only screen and (min-width: 900px) {
    width: 170px;
    &:nth-child(odd) {
      margin-right: 32px;
    }
  }
  @media only screen and (min-width: 1200px) {
    margin-right: 32px;
    &:nth-child(5n) {
      margin-right: 0;
    }
  }
`;

export const PlaceholderBox = styled.div`
  width: 180px;
  height: 200px;
  border: 5px solid #3a4662;
  padding: 15px 0 0 0;
  color: ${theme.color.white};
  border-radius: 15px;
  margin-bottom: 32px;
  cursor: pointer;
  transition: all 0.4s;
  margin-right: 16px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  &:hover {
    border: 5px solid ${theme.color.green};
  }
  @media only screen and (min-width: 900px) {
    div {
      img {
        width: 103px;
        height: 103px;
      }
    }
  }
`;

export const BoxText = styled.div`
  position: absolute;
  bottom: 10px;
  width: 100%;
  text-align: center;
  @media only screen and (min-width: 1024px) {
    font-size: 18px;
  }
`;

export const Meka = styled.div`
  text-align: center;
  img {
    width: 80px;
    border-radius: 15px;
  }
  @media only screen and (min-width: 900px) {
    img {
      width: 103px;
      height: 103px;
    }
  }
`;

export const RoboList = styled.div`
  display: flex;
  justify-content: ${({ length }) => (length > 2 ? "flex-start" : "center")};
  margin-top: 16px;
  overflow-x: scroll;
  padding-bottom: 5px;
`;

export const Robo = styled.div`
  margin: 5px;
  img {
    width: 80px;
    border-radius: 15px;
  }
  @media only screen and (min-width: 900px) {
    img {
      width: 103px;
      height: 103px;
    }
  }
`;

export const Icon = styled.div`
  font-size: 50px;
  color: ${theme.color.green};
  background: #292c45;
  width: 80px;
  height: 80px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.4s;
  &:hover {
    color: ${theme.color.white};
  }
  @media only screen and (min-width: 900px) {
    width: 103px;
    height: 103px;
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 32px;
  @media only screen and (min-width: 1200px) {
    flex-direction: row;
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
  &:last-child {
    margin-top: 32px;
  }
  @media only screen and (min-width: 600px) {
    width: 380px;
  }
  @media only screen and (min-width: 1200px) {
    width: ${({ claim }) => (claim ? `300px` : `214px`)};
    &:last-child {
      margin-top: 0;
      margin-left: 32px;
    }
  }
`;

export const HelperText = styled.div`
  color: ${theme.color.whiteGrey};
  text-align: center;
  margin-top: 32px;
  font-size: 18px;
`;

export const RewardAmount = styled.div`
  color: ${theme.color.white};
  background: rgba(41, 44, 69, 0.8);
  text-align: center;
  margin-top: 16px;
  width: 100%;
  padding: 4px 0;
  span {
    color: ${theme.color.whiteGrey};
    display: block;
  }
  @media only screen and (min-width: 1200px) {
    margin-top: 8px;
  }
`;

export const CustomCheckbox = styled(Checkbox)`
  color: ${theme.color.white};
  flex-direction: row-reverse;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 32px;
  width: 180px;
  justify-content: flex-end;
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
  margin: 0 auto;
  @media only screen and (min-width: 492px) {
    width: 400px;
  }
  @media only screen and (min-width: 688px) {
    width: 604px;
  }
  @media only screen and (min-width: 844px) {
    width: 832px;
  }
  @media only screen and (min-width: 900px) {
    width: 664px;
  }
  @media only screen and (min-width: 1200px) {
    width: 150px;
    margin: 0;
    justify-content: flex-start;
  }
`;

export const Headline = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  @media only screen and (min-width: 492px) {
    flex-direction: row;
    justify-content: space-between;
    width: 400px;
  }
  @media only screen and (min-width: 688px) {
    width: 604px;
  }
  @media only screen and (min-width: 844px) {
    width: 832px;
  }
  @media only screen and (min-width: 900px) {
    width: 664px;
  }
  @media only screen and (min-width: 1200px) {
    width: 1000px;
    flex-direction: row-reverse;
  }
`;

export const AddCrewButton = styled.button`
  background-color: ${theme.color.red};
  color: ${theme.color.white};
  border: none;
  cursor: pointer;
  width: 150px;
  height: 40px;
  border-radius: 400px;
  transition: ${theme.transition};
  &:hover {
    background-color: ${theme.color.redHover};
  }
`;
