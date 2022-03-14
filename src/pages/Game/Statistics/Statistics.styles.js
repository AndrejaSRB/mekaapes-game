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
  line-height: 1;
  font-size: 28px;
  text-transform: uppercase;
  span {
    display: block;
  }
  @media only screen and (min-width: 789px) {
    span {
      display: inline;
    }
  }
  @media only screen and (min-width: 1200px) {
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
  margin-bottom: 64px;
  @media only screen and (min-width: 1200px) {
    margin-bottom: 128px;
  }
  @media only screen and (min-width: 1300px) {
    padding-left: 0px;
    padding-right: 0px;
  }
`;

export const Holder = styled.div`
  @media only screen and (min-width: 789px) {
    display: flex;
    justify-content: space-between;
    margin-top: 32px;
  }
  @media only screen and (min-width: 1200px) {
    margin-top: 0px;
  }
  @media only screen and (min-width: 1300px) {
    margin: 0 16px;
  }
  @media only screen and (min-width: 1320px) {
    width: 1300px;
    margin: 0 auto;
  }
`;

export const Box = styled.div`
  background: ${theme.boxBackground};
  border: 8px solid ${theme.color.borderColor};
  border-radius: 50px;
  padding: 58px 8px;
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  h4 {
    margin-bottom: 24px;
    margin-top: 0;
    line-height: 1;
    color: ${theme.color.white};
    font-size: 21px;
    text-align: center;
  }
  @media only screen and (min-width: 789px) {
    max-width: 50%;
    margin-right: 32px;
  }
  @media only screen and (min-width: 1200px) {
    border: 10px solid ${theme.color.borderColor};
    padding: 54px;
    h4 {
      font-size: 38px;
    }
  }
`;

export const Stats = styled.div`
  border-right: 5px solid ${theme.color.borderColor};
  border-left: 5px solid ${theme.color.borderColor};
  border-top: ${({ position }) => {
    if (position === "first") {
      return `5px solid ${theme.color.borderColor}`;
    } else {
      return `2.5px solid ${theme.color.borderColor}`;
    }
  }};
  border-bottom: ${({ position }) => {
    if (position === "last") {
      return `5px solid ${theme.color.borderColor}`;
    } else {
      return `2.5px solid ${theme.color.borderColor}`;
    }
  }};
  border-radius: ${({ position }) => {
    if (position === "first") {
      return "25px 25px 0px 0px";
    }
    if (position === "last") {
      return "0px 0px 25px 25px";
    } else {
      return "0";
    }
  }};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px;
  span {
    color: ${theme.color.white};
    font-size: 12px;
    font-weight: 600;
  }
  .number {
    color: ${theme.color.whiteGrey};
  }
  @media only screen and (min-width: 1200px) {
    border-top: ${({ position }) => {
      if (position === "first") {
        return `10px solid ${theme.color.borderColor}`;
      } else {
        return `5px solid ${theme.color.borderColor}`;
      }
    }};
    border-left: 10px solid ${theme.color.borderColor};
    border-right: 10px solid ${theme.color.borderColor};
    border-bottom: ${({ position }) => {
      if (position === "last") {
        return `10px solid ${theme.color.borderColor}`;
      } else {
        return `5px solid ${theme.color.borderColor}`;
      }
    }};
    span {
      font-size: 21px;
    }
    .number {
      font-size: 18px;
    }
  }
`;

export const TotalText = styled.div`
  margin-top: 24px;
  color: ${theme.color.white};
  font-size: 18px;
  font-weight: 600;
  span {
    color: ${theme.color.green};
  }
  @media only screen and (min-width: 1200px) {
    font-size: 28px;
    padding-left: 10px;
  }
`;

export const LeaderboardsBox = styled.div`
  background: ${theme.boxBackground};
  border: 8px solid ${theme.color.borderColor};
  border-radius: 50px;
  padding: 58px 8px;
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  margin-top: 32px;
  h4 {
    margin-bottom: 24px;
    margin-top: 0;
    line-height: 1;
    color: ${theme.color.white};
    font-size: 21px;
    text-align: center;
  }
  @media only screen and (min-width: 789px) {
    max-width: 50%;
    margin-top: 0;
  }
  @media only screen and (min-width: 1200px) {
    border: 10px solid ${theme.color.borderColor};
    padding: 54px;
    h4 {
      font-size: 38px;
    }
  }
`;

export const BoardWrapper = styled.div`
  max-height: 371px;
  overflow-y: scroll;
  padding-right: 9px;
  @media only screen and (min-width: 1200px) {
    max-height: 530px;
  }
`;

export const Place = styled.div`
  border-right: 5px solid ${theme.color.borderColor};
  border-left: 5px solid ${theme.color.borderColor};
  border-top: ${({ position }) => {
    if (position === "first") {
      return `5px solid ${theme.color.borderColor}`;
    } else {
      return `2.5px solid ${theme.color.borderColor}`;
    }
  }};
  border-bottom: ${({ position }) => {
    if (position === "last") {
      return `5px solid ${theme.color.borderColor}`;
    } else {
      return `2.5px solid ${theme.color.borderColor}`;
    }
  }};
  border-radius: ${({ position }) => {
    if (position === "first") {
      return "25px 25px 0px 0px";
    }
    if (position === "last") {
      return "0px 0px 25px 25px";
    } else {
      return "0";
    }
  }};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px;
  span {
    color: ${theme.color.white};
    font-size: 12px;
    font-weight: 600;
  }
  .number {
    color: ${theme.color.whiteGrey};
  }
  @media only screen and (min-width: 1200px) {
    border-top: ${({ position }) => {
      if (position === "first") {
        return `10px solid ${theme.color.borderColor}`;
      } else {
        return `5px solid ${theme.color.borderColor}`;
      }
    }};
    border-left: 10px solid ${theme.color.borderColor};
    border-right: 10px solid ${theme.color.borderColor};
    border-bottom: ${({ position }) => {
      if (position === "last") {
        return `10px solid ${theme.color.borderColor}`;
      } else {
        return `5px solid ${theme.color.borderColor}`;
      }
    }};
    span {
      font-size: 21px;
    }
    .number {
      font-size: 18px;
    }
  }
`;

export const StatsBox = styled.div`
  @media only screen and (min-width: 1200px) {
    min-height: 400px;
  }
`;
