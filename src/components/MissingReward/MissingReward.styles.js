import styled from "styled-components";
// ******** Theme ********
import * as theme from "../../theme";

export const HelperText = styled.div`
  color: ${theme.color.whiteGrey};
  text-align: center;
  font-size: 18px;
  max-width: 800px;
  margin: 32px auto 0 auto;
  p {
    span {
      color: ${theme.color.white};
    }
  }
`;

export const HelperTitle = styled.div`
  color: ${theme.color.white};
  text-align: center;
  font-size: 24px;
  max-width: 800px;
  margin: 48px auto 0 auto;
  @media only screen and (min-width: 1200px) {
    font-size: 38px;
  }
`;

export const RewardsAction = styled.div`
  text-align: center;
  margin-top: 24px;
`;

export const Button = styled.button`
  background: ${theme.color.red};
  transition: ${theme.transition};
  cursor: pointer;
  border: none;
  color: ${theme.color.white};
  border-radius: 400px;
  height: 80px;
  width: 240px;
  font-size: 17px;
  &:hover {
    background: ${theme.color.redHover};
  }
  &:disabled {
    color: ${theme.color.white};
    border: 1px solid #ffffff;
    background: ${theme.color.secondButton};
    cursor: not-allowed;
  }
  &:last-child {
    margin-top: 32px;
  }
  @media only screen and (min-width: 600px) {
    width: 380px;
  }
  @media only screen and (min-width: 1200px) {
    width: auto;
    padding-left: 30px;
    padding-right: 30px;
    font-size: 21px;
    &:last-child {
      margin-top: 0;
      margin-left: 32px;
    }
  }
`;
