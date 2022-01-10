import styled from "styled-components";
// ******** Theme ********
import * as theme from "../../../../theme";

export const Table = styled.div`
  width: 100%;
  background: #292c45;
  border: 5px solid ${theme.color.green};
  box-sizing: border-box;
  -webkit-box-shadow: 0px 0px 40px #11051b;
  box-shadow: 0px 0px 40px #11051b;
  border-radius: 15px;
  padding: 14px;
  width: 900px;
  margin: 0 auto;
  overflow-x: scroll;
  margin-bottom: 32px;
  margin-top: 16px;
  @media only screen and (min-width: 1024px) {
    padding: 24px;
  }
`;

export const Headline = styled.div`
  display: flex;
  color: ${theme.color.white};
  font-size: 18px;
  font-weight: 600;
  border-bottom: 1px solid ${theme.color.whiteGrey};
  padding-bottom: 8px;
  margin-bottom: 8px;
  .empty {
    width: 20%;
  }
  .full {
    width: 40%;
  }
  @media only screen and (min-width: 1024px) {
    font-size: 21px;
  }
`;

export const Body = styled.div``;

export const Cell = styled.div`
  display: flex;
  padding-bottom: 8px;
  margin-bottom: 8px;
  border-bottom: 1px solid ${theme.color.whiteGrey};
  .smaller {
    width: 20%;
    color: ${theme.color.white};
    font-size: 18px;
    font-weight: 600;
  }
  .bigger {
    width: 40%;
    font-size: 14px;
    padding-right: 8px;
    span {
        font-weight: 600;
        color: ${theme.color.white}
    }
    &:last-child {
        padding-right: 0;
    }
  }
  &:last-child {
      border-bottom: 0;
      margin-bottom: 0;
      padding-bottom: 0;
  }
  @media only screen and (min-width: 1024px) {
    .smaller {
        font-size: 21px;
    }
    .bigger {
        font-size: 16px;
        padding-right: 16px;
    &:last-child {
        padding-right: 0;
    }
  }
`;
