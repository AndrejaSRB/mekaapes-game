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
    margin-top: 190px;
  }
`;

export const Content = styled.div`
  padding: 0 16px;
  margin-bottom: 64px;
  @media only screen and (min-width: 1200px) {
    margin-bottom: 128px;
  }
  @media only screen and (min-width: 1300px) {
    padding-left: 16px;
    padding-right: 16px;
  }
  @media only screen and (min-width: 1320px) {
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
  @media only screen and (min-width: 1320px) {
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
      -webkit-filter: drop-shadow(0px 0px 40px #11051b);
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
  @media only screen and (min-width: 1200px) {
    h6 {
      font-size: 21px;
    }
  }
`;

export const NftList = styled.div`
  display: flex;
  justify-content: ${({ length }) => (length > 2 ? "flex-start" : "center")};
  align-items: center;
  overflow-x: scroll;
  max-width: 332px;
  margin: 0 auto;
  margin-bottom: 38px;
  padding-bottom: 9px;
  @media only screen and (min-width: 900px) {
    max-width: 564px;
    margin-bottom: 49px;
  }
  @media only screen and (min-width: 1200px) {
    max-width: 339px;
    /* margin-bottom: ${({ meka }) => (meka ? "0px" : "35px")}; */
    margin-bottom: 16px;
    height: 148px;
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

export const PlaceholderImage = styled.div`
  border: 3px solid
    ${({ selected }) => (selected ? theme.color.green : "transparent")};
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
    margin-top: ${({ type }) => {
      if (type === "claim") {
        return "26px";
      } else if (type === "stake") {
        return "18px";
      } else {
        return "32px";
      }
    }};
  }
`;

export const ButtonClaim = styled.button`
  background-color: ${theme.color.red};
  color: ${theme.color.white};
  border: none;
  cursor: pointer;
  width: 240px;
  height: 50px;
  margin: 16px auto 0 auto;
  font-size: 16px;
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
    height: 80px;
    font-size: 21px;
  }
  @media only screen and (min-width: 1200px) {
    margin-top: 26px;
  }
`;

export const NotFoundItem = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
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
        text-align: left;
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
  @media only screen and (min-width: 420px) {
    width: 320px;
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
  padding-bottom: 9px;
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
    height: 228px;
    overflow-y: scroll;
    overflow-x: hidden;
    justify-content: ${({ length }) => {
      if (length && length > 0) {
        return "flex-start";
      } else {
        return "center";
      }
    }};
  }
  @media only screen and (min-width: 1200px) {
    max-width: 388px;
    height: 238px;
  }
`;

export const NftBox = styled.div`
  display: flex;
  justify-content: ${({ lenght }) => (lenght > 1 ? "center" : "flex-start")};
  flex-wrap: wrap;
  min-width: 172px;
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
  border-radius: 15px;
  overflow: hidden;
  border: 3px solid
    ${({ selected }) => (selected ? theme.color.green : "transparent")};
  img {
    width: 70px;
    border-radius: 15px;
  }
  div {
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    background: rgba(41, 44, 69, 0.8);
    color: ${theme.color.white};
    text-align: center;
    font-size: 14px;
    height: 20px;
  }
  @media only screen and (min-width: 900px) {
    margin: 8px 6px;
    height: 98px;
    border: 5px solid
      ${({ selected }) => (selected ? theme.color.green : "transparent")};
    img {
      width: 98px;
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
  height: 50px;
  margin: 32px auto 0 auto;
  font-size: 16px;
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
    height: 80px;
    font-size: 21px;
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
      width: 215px;
      height: 215px;
      margin: 0 auto 25px auto;
      border-radius: 30px;
      -webkit-filter: drop-shadow(0px 0px 40px #11051b);
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

export const Subtitle = styled.div`
  color: ${theme.color.white};
  max-width: 332px;
  margin: 0 auto;
  h6.robo {
    color: ${theme.color.white};
  }
  h6.meka {
    margin-top: 38px;
    color: ${theme.color.white};
  }
  @media only screen and (min-width: 900px) {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    h6.robo {
      margin-bottom: 5px;
    }
    h6.robo,
    h6.meka {
      width: 50%;
      text-align: left;
    }
  }
  @media only screen and (min-width: 900px) {
    max-width: 564px;
    margin-bottom: 9px;
    h6.meka {
      margin-bottom: 0px;
    }
  }
  @media only screen and (min-width: 1200px) {
    max-width: 332px;
    h6 {
      font-size: 21px;
    }
    h6.meka {
      margin-top: 0;
    }
  }
  @media only screen and (min-width: 1520px) {
    h6.meka {
      margin-bottom: 5px;
    }
  }
`;

export const CustomUnstakeCheckbox = styled(Checkbox)`
  color: ${theme.color.white};
  flex-direction: row-reverse;
  font-size: 16px;
  font-weight: 600;
  width: 100%;
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
  margin: 0 auto 10px auto;
  @media only screen and (min-width: 900px) {
    margin-bottom: 0px;
    justify-content: flex-start;
    width: 50%;
  }
  @media only screen and (min-width: 1200px) {
  }
`;

export const ApeInProgress = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 2px;
  cursor: not-allowed;
  position: relative;
  img {
    width: 80px;
    border-radius: 15px;
    border: 3px solid transparent;
  }
  .icon-one {
    position: absolute;
    color: ${theme.color.green};
    bottom: 25px;
    left: 20px;
    span > svg {
      font-size: 32px;
    }
  }
  .icon-two {
    position: absolute;
    color: ${theme.color.green};
    top: 30px;
    right: 20px;
    span > svg {
      font-size: 26px;
    }
  }
  @media only screen and (min-width: 900px) {
    margin: 0 5px;
    img {
      width: 103px;
    }
  }
`;

export const SelectedCounter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${theme.color.white};
  max-width: 332px;
  margin: ${({ staked }) =>
    staked ? "24px auto 16px auto" : "0 auto 16px auto"};
  .numbers {
    color: ${theme.color.green};
  }
  @media only screen and (min-width: 900px) {
    max-width: 564px;
  }
  @media only screen and (min-width: 1200px) {
    max-width: 339px;
  }
`;

export const Tabs = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Tab = styled.div`
  color: ${({active}) => active ? theme.color.red : theme.color.white};
  cursor: pointer;
  transition: all .4s;
  font-size: 18px;
  margin-bottom: 16px;
  &:hover {
      color: ${theme.color.red};
  }
  &:first-child {
      margin-right: 16px;
  }
  @media only screen and (min-width: 1200px) {
    font-size: 26px;
  }
`;
