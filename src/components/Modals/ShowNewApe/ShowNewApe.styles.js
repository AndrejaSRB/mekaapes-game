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
        .ant-carousel {
          width: 100%;
        }
        .ant-carousel .slick-prev,
        .ant-carousel .slick-prev:hover {
          left: 15px;
          z-index: 2;
          color: white;
          font-size: 16px;
          height: 30px;
          width: 30px;
          background: ${theme.color.green};
          border-radius: 100%;
          display: flex !important;
          justify-content: center;
          align-items: center;
          &:before {
            content: "";
          }
          @media only screen and (min-width: 789px) {
            height: 40px;
            width: 40px;
            left: 25px;
          }
        }

        .ant-carousel .slick-next,
        .ant-carousel .slick-next:hover {
          right: 15px;
          z-index: 2;
          color: white;
          font-size: 16px;
          height: 30px;
          width: 30px;
          background: ${theme.color.green};
          border-radius: 100%;
          display: flex !important;
          justify-content: center;
          align-items: center;
          &:before {
            content: "";
          }
          @media only screen and (min-width: 789px) {
            height: 40px;
            width: 40px;
            right: 25px;
          }
        }
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
      font-size: 19px;
      color: ${theme.color.whiteGrey};
      transition: all 0.4s;
      &:hover {
        color: ${theme.color.white};
      }
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
    margin-bottom: 45px;
  }
`;

export const Text = styled.div`
  font-size: 16px;
  color: ${theme.color.white};
  margin-top: 25px;
  @media only screen and (min-width: 789px) {
    font-size: 21px;
  }
`;

export const Slide = styled.div`
  font-size: 14px;
  color: ${theme.color.white};
  margin-top: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 16px;
  p {
    color: ${theme.color.white};
    text-align: center;
    margin-bottom: 20px;
    padding: 0 15px;
  }
  @media only screen and (min-width: 789px) {
    font-size: 19px;
  }
`;

export const ImageHolder = styled.div`
  width: 130px;
  height: 130px;
  margin: 0 auto 23px auto;
  img {
    width: 100%;
    height: 100%;
    border-radius: 30px;
  }
  @media only screen and (min-width: 789px) {
    width: 160px;
    height: 160px;
    -webkit-filter: drop-shadow(0px 0px 40px #11051b);
    filter: drop-shadow(0px 0px 40px #11051b);
  }
`;

export const ButtonWrapper = styled.div`
  text-align: center;
  margin-top: 16px;
  button {
    color: ${theme.color.white};
    background: transparent;
    border: none;
    font-size: 19px;
    cursor: pointer;
  }
`;
