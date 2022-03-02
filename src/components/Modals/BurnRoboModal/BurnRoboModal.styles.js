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
        padding: 0 14px;
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
    @media only screen and (min-width: 789px) {
      padding-bottom: 15px;
    }
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Button = styled.button`
  color: ${theme.color.white};
  background: ${theme.color.red};
  border: none;
  cursor: pointer;
  width: 100%;
  height: 80px;
  border-radius: 400px;
  font-size: 21px;
  margin-bottom: 32px;
  transition: ${theme.transition};
  &:hover {
    background: ${theme.color.redHover};
  }
  &:disabled {
    color: ${theme.color.white};
    border: 1px solid #ffffff;
    background: ${theme.color.secondButton};
    cursor: not-allowed;
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

export const Title = styled.h2`
  font-weight: 600;
  font-size: 24px;
  line-height: 31px;
  text-align: center;
  color: ${theme.color.white};
  margin-top: 0;
  margin-bottom: 16px;
  @media only screen and (min-width: 789px) {
    font-size: 38px;
    line-height: 49px;
    margin-bottom: 24px;
  }
`;
export const Subtitle = styled.h3`
  font-size: 16px;
  line-height: 21px;
  text-align: center;
  font-weight: 300;
  margin-bottom: 0;
  color: ${theme.color.whiteGrey};
  @media only screen and (min-width: 789px) {
    font-size: 18px;
    line-height: 23px;
  }
`;

export const RoboApesBox = styled.div`
  margin-top: 24px;
  margin-bottom: 32px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: ${({ length }) => (length < 1 ? "135px" : "348px")};
  max-width: 414px;
  overflow-y: scroll;
  @media only screen and (min-width: 789px) {
    margin-top: 32px;
    max-width: 616px;
    height: ${({ length }) => (length < 1 ? "160px" : "235px")};
    justify-content: flex-start;
  }
`;

export const Ape = styled.div`
  margin: 8px;
  width: 100px;
  height: 100px;
  cursor: pointer;
`;

export const ApeImage = styled.img`
  width: 100px;
  height: 100px;
  -webkit-filter: drop-shadow(0px 0px 40px #11051b);
  filter: drop-shadow(0px 0px 10px #11051b);
  border: ${({ currentLvl }) => {
    if (currentLvl) {
      return `5px solid ${theme.color.level[currentLvl]}`;
    } else {
      return `none`;
    }
  }};
  border-radius: 15px;
  opacity: ${({ active }) => (active ? 1 : 0.3)};
`;

export const PlaceholderImage = styled.div`
  opacity: ${({ active }) => (active ? 1 : 0.3)}; ;
`;

export const Text = styled.span`
  color: ${theme.color.grey};
  margin: 24px 0 32px 0;
  font-size: 15px;
  text-align: center;
  line-height: 1.5;
  @media only screen and (min-width: 789px) {
    font-size: 18px;
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

export const HelperText = styled.div`
  text-align: center;
  margin-bottom: 16px;
  font-size: 16px;
  @media only screen and (min-width: 1024px) {
    font-size: 18px;
  }
`;
