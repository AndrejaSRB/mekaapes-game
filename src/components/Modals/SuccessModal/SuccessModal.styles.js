import styled from "styled-components";
// ******** Theme ********
import * as theme from "../../../theme";
// ******** Components ********
import { Modal } from "antd";

export const ModalWrapper = styled(Modal)`
  & > .ant-modal-content {
    background-color: #221c38;
    padding: 64px 0;
    color: ${theme.color.white};
    border-radius: 50px;
    border: 10px solid ${theme.color.green};
    margin: 0 10px;
    & > .ant-modal-body {
      padding: 0;
      & > .content {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
    & > button {
      right: 20px;
      top: 10px;
      @media only screen and (min-width: 789px) {
        font-size: 18px;
        right: 15px;
        top: 20px;
      }
    }
    & > button > .ant-modal-close-x > span > svg {
      color: ${theme.color.white} !important;
      font-size: 19px;
    }
    & > .ant-modal-footer {
      display: none;
    }
  }
`;

export const Animation = styled.div`
  width: 100%;
  text-align: center;
  img {
    width: 170px;
    border-radius: 30px;
    -webkit-filter: drop-shadow(0px 0px 40px #11051b);
    filter: drop-shadow(0px 0px 40px #11051b);
  }
  @media only screen and (min-width: 789px) {
    img {
      width: 215px;
    }
  }
`;

export const Title = styled.div`
  font-size: 25px;
  color: ${theme.color.white};
  margin-top: 25px;
  margin-bottom: 32;
  @media only screen and (min-width: 789px) {
    font-size: 38px;
    margin-bottom: 24px;
  }
`;

export const Text = styled.div`
  font-size: 16px;
  color: ${theme.color.whiteGrey};
  margin-top: 25px;
  width: 90%;
  margin: 25px auto 0 auto;
  text-align: center;
  @media only screen and (min-width: 789px) {
    font-size: 21px;
    max-width: 550px;
    width: 100%;
  }
`;

export const ButtonWrapper = styled.div`
  text-align: center;
  margin-top: 32px;
  button {
    color: ${theme.color.white};
    background: transparent;
    border: none;
    font-size: 21px;
    cursor: pointer;
  }
`;

export const List = styled.ul`
  list-style: circle;
  margin-top: 16px;
  li {
    margin: 5px 0;
    font-size: 16px;
    color: ${theme.color.white};
  }
  @media only screen and (min-width: 789px) {
    li {
      font-size: 18px;
    }
  }
`;
