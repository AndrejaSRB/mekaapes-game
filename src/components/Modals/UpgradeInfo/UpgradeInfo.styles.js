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

export const Picture = styled.div`
  width: 100%;
  text-align: center;
  img {
    width: 98%;
  }
  @media only screen and (min-width: 789px) {
    img {
      width: 680px;
    }
  }
  @media only screen and (min-width: 1024px) {
    img {
      width: 900px;
    }
  }
`;

export const MobileTable = styled.div`
  display: block;
  padding: 0 24px;
  @media only screen and (min-width: 789px) {
    display: none;
  }
`;

export const Box = styled.div`
  width: 100%;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  border-bottom: 3px solid ${theme.color.green};
  color: ${theme.color.whiteGrey};
  padding-bottom: 8px;
  .cell {
    display: flex;
    align-items: center;
    border-bottom: 1px dotted ${theme.color.whiteGrey};
    padding-top: 8px;
    padding-bottom: 3px;
    &:last-child {
      border: none;
    }
    .self-align {
      align-self: flex-start;
    }
    span:first-child {
      width: 40%;
      display: block;
      color: ${theme.color.white};
    }
    span:last-child {
      width: 60%;
    }
    span > small {
      font-weight: 600;
      font-size: 14px;
      color: ${theme.color.white};
    }
    @media only screen and (min-width: 400px) {
      font-size: 16px;
      .cell {
        span:first-child {
          width: 35%;
        }
        span:last-child {
          width: 55%;
        }
      }
    }
  }
`;
