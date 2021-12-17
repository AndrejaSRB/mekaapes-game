import styled from "styled-components";
// ******** Theme ********
import * as theme from "../../../theme";
// ******** Image ********
import BackgroundImage from "../../../assets/background.jpg";
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
  line-height: 1;
  font-size: 28px;
  text-transform: uppercase;
  span {
    color: ${theme.color.red};
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
    margin-top: 285px;
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
  @media only screen and (min-width: 1300px) {
    width: 1300px;
    margin: 0 auto;
    padding: 54px;
  }
`;

export const MobileBoxHeader = styled.div`
  margin-bottom: 32px;
  text-align: center;
  div {
    width: 172px;
    margin: 0 auto 27px auto;
    & > img {
      width: 100%;
      border-radius: 30px;
      filter: drop-shadow(0px 0px 40px #11051b);
    }
  }
  p {
    color: ${theme.color.white};
    span {
      display: block;
      color: ${theme.color.whiteGrey};
    }
  }
  @media only screen and (min-width: 900px) {
    p {
      font-size: 21px;
    }
  }
  @media only screen and (min-width: 1200px) {
    display: none;
  }
`;

export const Unstaked = styled.div`
  h5 {
    text-transform: uppercase;
    color: ${theme.color.green};
    text-align: center;
  }
  h6 {
    color: ${theme.color.white};
  }
  h6.meka {
    margin-top: 38px;
  }
  @media only screen and (min-width: 1200px) {
    h6 {
      font-size: 21px;
    }
  }
`;

export const NftList = styled.div`
  display: flex;
  justify-content: ${({ lenght }) => (lenght > 2 ? "flex-start" : "center")};
  align-items: center;
  overflow-x: scroll;
  max-width: 332px;
  margin: 0 auto;
  @media only screen and (min-width: 900px) {
    max-width: 564px;
  }
  @media only screen and (min-width: 1200px) {
    max-width: 332px;
  }
`;

export const Nft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 2px;
  cursor: pointer;
  img {
    width: 80px;
    border-radius: 15px;
    border: 3px solid
      ${({ selected }) => (selected ? theme.color.green : "transparent")};
  }
  @media only screen and (min-width: 900px) {
    margin: 0 5px;
    img {
      width: 103px;
      border: 5px solid
        ${({ selected }) => (selected ? theme.color.green : "transparent")};
    }
  }
`;

export const Button = styled.button`
  background-color: ${theme.color.red};
  color: ${theme.color.white};
  border: none;
  cursor: pointer;
  width: 240px;
  height: 80px;
  margin: 32px auto 0 auto;
  font-size: 21px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 400px;
  transition: ${theme.transition};
  &:hover {
    background-color: ${theme.color.redHover};
  }
  &:disabled {
    color: ${theme.color.white};
    border: 1px solid #ffffff;
    background: ${theme.color.secondButton};
    cursor: not-allowed;
  }
  @media only screen and (min-width: 900px) {
    width: 388px;
  }
  @media only screen and (min-width: 1200px) {
    margin-top: ${({ claim }) => (claim ? "40px" : "32px")};
  }
`;

export const NotFoundItem = styled.div`
  text-align: center;
  img {
    width: 80px;
    border-radius: 15px;
  }
  p {
    font-size: 16px;
    color: ${theme.color.white};
    margin-top: 24px;
    margin-bottom: 0;
    font-weight: 600;
  }
  @media only screen and (min-width: 900px) {
    img {
      width: 103px;
    }
    p {
      font-size: 18px;
    }
  }
`;

export const HelperText = styled.p`
  margin: 16px 0 0 0;
  color: ${theme.color.whiteGrey};
  text-align: center;
`;

export const Staked = styled.div`
  text-align: center;
  h5 {
    text-transform: uppercase;
    color: ${theme.color.green};
    text-align: center;
    margin-top: 32px;
  }
  .subtitle {
    h6 {
      color: ${theme.color.white};
    }
  }
  @media only screen and (min-width: 900px) {
    width: 564px;
    margin: 0 auto;
    .subtitle {
      display: flex;
      align-items: center;
      justify-content: space-between;
      h6 {
        text-align: left;
        margin-bottom: 0;
      }
    }
  }
  @media only screen and (min-width: 1200px) {
    width: 388px;
    h5 {
      margin-top: 0;
    }
    .subtitle {
      display: flex;
      align-items: center;
      margin-top: 8px;
      h6 {
        margin-bottom: 24px;
        text-align: center;
      }
    }
  }
`;

export const CustomCheckbox = styled(Checkbox)`
  color: ${theme.color.white};
  flex-direction: row-reverse;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 32px;
  width: 100%;
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
  margin: 0 auto 32px auto;
  @media only screen and (min-width: 340px) {
    width: 332px;
  }
  @media only screen and (min-width: 900px) {
    margin-bottom: 0px;
    width: 564px;
    justify-content: flex-start;
  }
  @media only screen and (min-width: 1200px) {
    margin-bottom: 11px;
    width: 332px;
  }
`;

export const ApeList = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  overflow-x: scroll;
  max-width: 332px;
  margin: 0 auto;
  @media only screen and (min-width: 900px) {
    display: none;
  }
`;

export const ApeListDesktop = styled.div`
  display: none;
  @media only screen and (min-width: 900px) {
    display: flex;
    flex-wrap: wrap;
    max-width: 564px;
    height: 220px;
    overflow-y: scroll;
    overflow-x: hidden;
    justify-content: center;
  }
  @media only screen and (min-width: 1200px) {
    max-width: 388px;
    height: 226px;
  }
`;

export const NftBox = styled.div`
  display: flex;
  justify-content: ${({lenght}) => lenght > 1 ? "center" : "flex-start"};
  flex-wrap: wrap;
  min-width: 240px;
  width: 100%;
  @media only screen and (min-width: 900px) {
    min-width: 330px;
  }
  @media only screen and (min-width: 1200px) {
    width: 388px;
  }
`;

export const ApeNft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  cursor: pointer;
  position: relative;
  height: 70px;
  img {
    width: 70px;
    border-radius: 15px;
    border: 3px solid
      ${({ selected }) => (selected ? theme.color.green : "transparent")};
  }
  div {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: rgba(41, 44, 69, 0.8);
    border-radius: 0px 0px 15px 15px;
    color: ${theme.color.white};
    text-align: center;
    font-size: 14px;
    height: 20px;
  }
  @media only screen and (min-width: 900px) {
    margin: 8px 6px;
    height: 98px;
    img {
      width: 98px;
      border: 5px solid
        ${({ selected }) => (selected ? theme.color.green : "transparent")};
    }
    div {
      font-size: 15px;
    }
  }
  @media only screen and (min-width: 1200px) {
    margin: 8px 6px;
    height: 103px;
    img {
      width: 103px;
      border: 5px solid
        ${({ selected }) => (selected ? theme.color.green : "transparent")};
    }
    div {
      font-size: 16px;
    }
  }
`;

export const ClaimAndUnstakeButton = styled.button`
  background-color: ${theme.color.red};
  color: ${theme.color.white};
  border: none;
  cursor: pointer;
  width: 240px;
  height: 80px;
  margin: 32px auto 0 auto;
  font-size: 21px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 400px;
  transition: ${theme.transition};
  &:hover {
    background-color: ${theme.color.redHover};
  }
  &:disabled {
    color: ${theme.color.white};
    border: 1px solid #ffffff;
    background: ${theme.color.secondButton};
    cursor: not-allowed;
  }
  @media only screen and (min-width: 900px) {
    width: 388px;
    flex-direction: row;
    span {
      margin-left: 5px;
    }
  }
`;

export const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Boxes = styled.div`
  @media only screen and (min-width: 1200px) {
    display: flex;
    justify-content: space-between;
  }
`;

export const MiddleBox = styled.div`
  display: none;
  @media only screen and (min-width: 1200px) {
    width: 388px;
    margin: 0 auto;
    padding-top: 13px;
    display: block;
    text-align: center;
    img {
      width: 207px;
      margin: 0 auto 25px auto;
      border-radius: 30px;
      filter: drop-shadow(0px 0px 40px #11051b);
    }
    p {
      color: ${theme.color.white};
      font-size: 21px;
      span {
        color: ${theme.color.whiteGrey};
        display: block;
        font-size: 18px;
      }
    }
  }
`;

export const StakedText = styled.div`
  color: ${theme.color.whiteGrey};
  p {
    margin: 0;
    line-height: 21px;
    font-size: 16px;
    span {
      color: ${theme.color.white};
      margin-top: 10px;
      display: block;
    }
  }
  p:first-child {
    margin-top: 24px;
  }
  p:last-child {
    margin-top: 24px;
  }
  @media only screen and (min-width: 900px) {
    p {
      font-size: 18px;
      span {
        display: inline;
        font-size: 21px;
      }
    }
    p:last-child {
      margin-top: 10px;
    }
  }
`;
