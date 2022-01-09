import styled, { keyframes } from "styled-components";
// ******** Theme ********
import * as theme from "../../../theme";
// ******** Components ********
import { Modal } from "antd";

export const ModalWrapper = styled(Modal)`
  & > .ant-modal-content {
    background-color: transparent;
    padding: 64px 0;
    color: ${theme.color.white};
    border-radius: 50px;
    /* border: 10px solid ${theme.color.green}; */
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
      display: none;
    }
    & > .ant-modal-footer {
      display: none;
    }
  }
`;

export const LoadingPicture = styled.div`
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

export const Text = styled.div`
  font-size: 25px;
  color: ${theme.color.white};
  margin-top: 25px;
  @media only screen and (min-width: 789px) {
    font-size: 38px;
  }
`;


const blink = keyframes`
  50% {color: transparent;}
`;

export const Dot = styled.span`
  animation: 1s ${blink} infinite;
  padding-right: 3px;
  padding-left: 2px;
  &:nth-child(1) {
    animation-delay: 0ms;
  }
  &:nth-child(2) {
    animation-delay: 250ms;
  }
  &:nth-child(3) {
    animation-delay: 500ms;
  }
`;
