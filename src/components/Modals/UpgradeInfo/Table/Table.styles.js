import styled from "styled-components";
// ******** Theme ********
import * as theme from "../../../../theme";

export const Table = styled.div`
  width: 100%;
  /* background: #292c45; */
  box-sizing: border-box;
  /* -webkit-box-shadow: 0px 0px 40px #11051b;
  box-shadow: 0px 0px 40px #11051b;
  border-radius: 15px; */
  padding: 14px;
  margin: 0 auto;
  display: none;
  @media only screen and (min-width: 789px) {
  display: block;
    padding: 10px;
    width: 690px;
  }
  @media only screen and (min-width: 820px) {
    width: 725px;
  }
  @media only screen and (min-width: 900px) {
    width: 800px;
  }
  @media only screen and (min-width: 1024px) {
    padding: 24px;
    width: 900px;
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
    width: 14%;
  }
  .middle {
    width: 24%;
  }
  .full {
    width: 31%;
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
    width: 14%;
    color: ${theme.color.white};
    font-size: 18px;
    font-weight: 600;
  }
  .medium {
    width: 24%;
  }

  .bigger {
    width: 31%;
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
  @media only screen and (min-width: 900px) {
    .smaller {
        font-size: 16px;
    }
    .medium {
        font-size: 14px;
    }
    .bigger {
        font-size: 14px;
    }
  }
  @media only screen and (min-width: 1024px) {
    .smaller {
        font-size: 21px;
    }
    .medium {
        font-size: 18px;
    }
    .bigger {
        font-size: 18px;
        padding-right: 16px;
    &:last-child {
        padding-right: 0;
    }
  }
`;
