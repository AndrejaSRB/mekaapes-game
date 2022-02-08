import styled from "styled-components";
// ******** Theme ********
import * as theme from "../../theme";

export const Wrapper = styled.div`
  margin-bottom: 60px;
  @media only screen and (min-width: 1300px) {
    margin-bottom: 100px;
  }
`;

export const Box = styled.div`
  background: ${theme.boxBackground};
  border: 8px solid ${theme.color.borderColor};
  border-radius: 50px;
  padding: 54px 14px;
  margin: 0 auto;
  h4 {
    margin-bottom: 24px;
    margin-top: 0;
    line-height: 1;
    color: ${theme.color.white};
    font-size: 21px;
    text-align: center;
  }
  p {
    color: ${theme.color.white};
    text-align: center;
    font-size: 16px;
    span {
      font-weight: bold;
    }
  }
  @media only screen and (min-width: 1024px) {
    p {
      font-size: 18px;
    }
  }
  @media only screen and (min-width: 1300px) {
    margin: 0 16px;
    padding: 54px;
    border: 10px solid ${theme.color.borderColor};
    padding: 54px;
    h4 {
      font-size: 38px;
    }
  }
  @media only screen and (min-width: 1320px) {
    width: 1300px;
    margin: 0 auto;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
  button {
    background: ${theme.color.red};
    transition: ${theme.transition};
    cursor: pointer;
    border: none;
    color: ${theme.color.white};
    border-radius: 400px;
    height: 60px;
    width: 240px;
    font-size: 21px;
    &:hover {
      background: ${theme.color.redHover};
    }
    &:disabled {
      color: ${theme.color.white};
      border: 1px solid #ffffff;
      background: ${theme.color.secondButton};
      cursor: not-allowed;
    }
  }
  @media only screen and (min-width: 1024px) {
    button {
      height: 80px;
    }
  }
`;
