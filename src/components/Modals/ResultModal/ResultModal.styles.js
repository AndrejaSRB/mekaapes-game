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
      color: ${theme.color.white};
      font-size: 19px;
      color: ${theme.color.grey};
    }
    & > .ant-modal-footer {
      display: none;
    }
  }
`;

export const Title = styled.div`
  font-size: 21px;
  color: ${theme.color.white};
  margin-top: 25px;
  margin-bottom: 32px;
  text-align: center;
  @media only screen and (min-width: 789px) {
    font-size: 27px;
    margin-bottom: 10px;
  }
`;

export const Text = styled.div`
  font-size: 16px;
  color: ${({white}) => white ? theme.color.white : theme.color.whiteGrey };
  margin-top: 16px;
  margin-bottom: 16px;
  text-align: center;
  @media only screen and (min-width: 789px) {
    font-size: 19px;
    margin-bottom: 16px;
  }
`;

export const List = styled.ul`
  list-style: circle;
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
