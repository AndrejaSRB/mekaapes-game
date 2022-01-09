import styled from "styled-components";
// ******** Theme ********
import * as theme from "../../theme";

export const Wrapper = styled.div`
  color: ${theme.color.white};
  text-align: center;
  font-size: 16px;
  @media only screen and (min-width: 1024px) {
    font-size: 21px;
  }
`;

export const Counter = styled.div`
  display: flex;
  justify-content: center;
`;

export const Title = styled.div`
  font-size: 21px;
  margin-bottom: 8px;
  span {
    display: block;
  }
  @media only screen and (min-width: 1024px) {
    font-size: 24px;
    span {
      display: inline;
    }
  }
`;

export const Timer = styled.div`
  font-size: 21px;
  margin-bottom: 16px;
  color: ${theme.color.red};
  font-weight: 600;
  line-height: 1;
  span {
    padding-right: 10px;
    font-size: 18px;
  }
  @media only screen and (min-width: 1024px) {
    font-size: 38px;
    margin-bottom: 24px;
    span {
      font-size: 21px;
    }
  }
`;

export const EndTitle = styled.div`
  color: ${theme.color.red};
  font-size: 21px;
  font-weight: 600;
  @media only screen and (min-width: 1024px) {
    font-size: 38px;
    position: relative;
    top: -5px;
  }
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .wrapper {
    display: flex;
    flex-direction: column;
  }
  .wrapper.right {
    margin-top: 16px;
  }
  @media only screen and (min-width: 1024px) {
    flex-direction: row;
    width: 620px;
    margin: 0 auto;
    justify-content: space-between;
    margin-bottom: 54px;
    .wrapper.right {
      margin-top: 0;
      position: relative;
      top: -5px;
    }
  }
`;

export const Text = styled.div`
  font-size: 24px;
  margin-bottom: 16px;
`;

export const TokenCounter = styled.div`
  color: ${theme.color.green};
  font-weight: 600;
  position: relative;
  top: -5px;
  font-size: 21px;
  margin-left: 16px;
  @media only screen and (min-width: 1024px) {
    font-size: 32px;
  }
`;
