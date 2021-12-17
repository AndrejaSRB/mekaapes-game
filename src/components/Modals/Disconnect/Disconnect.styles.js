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

export const DisconnectBtn = styled.button`
  color: ${theme.color.white};
  background: ${theme.color.red};
  border: none;
  margin-top: 15px;
  cursor: pointer;
  width: 90%;
  height: 80px;
  border-radius: 400px;
  font-size: 21px;
  margin-bottom: 32px;
  transition: ${theme.transition};
  &:hover {
    background: ${theme.color.redHover};
  }
  @media only screen and (min-width: 450px) {
    width: 388px;
  }
`;

export const CancelBtn = styled.button`
  color: ${theme.color.white};
  background: transparent;
  border: none;
  font-size: 21px;
  cursor: pointer;
`;

export const WalletId = styled.span`
  color: ${theme.color.white};
  font-weight: 600;
  font-size: 30px;
  @media only screen and (min-width: 789px) {
    font-size: 38px;
  }
`;

export const Text = styled.span`
  color: ${theme.color.white};
  margin: 24px 0 32px 0;
  font-size: 15px;
  @media only screen and (min-width: 789px) {
    font-size: 18px;
  }
  color: ${theme.color.grey};
`;
