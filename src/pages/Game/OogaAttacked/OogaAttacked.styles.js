import styled from "styled-components";
// ******** Theme ********
import * as theme from "../../../theme";
// ******** Component ********
import { Pagination } from "antd";

export const Wrapper = styled.div`
  margin-top: 100px;
`;

export const Title = styled.h1`
  color: ${theme.color.white};
  text-align: center;
  margin-bottom: 16px;
  font-size: 28px;
  line-height: 36px;
  text-transform: uppercase;
  & > span {
    display: block;
    width: 100%;
  }
  @media only screen and (min-width: 650px) {
    & > span {
      display: inline;
    }
  }
  @media only screen and (min-width: 1024px) {
    font-size: 52px;
    margin-bottom: 45px;
  }
`;

export const Content = styled.div`
  padding: 0 16px;
  margin-bottom: 32px;
  @media only screen and (min-width: 1024px) {
    margin-bottom: 96px;
  }
  @media only screen and (min-width: 1300px) {
    padding-left: 0px;
    padding-right: 0px;
  }
`;

export const MainBox = styled.div`
  background: ${theme.boxBackground};
  border: 10px solid ${theme.color.borderColor};
  border-radius: 50px;
  padding: 54px 14px;
  @media only screen and (min-width: 1024px) {
    padding: 64px 20px;
  }
  @media only screen and (min-width: 1300px) {
    margin: 0 16px;
    padding: 54px;
  }
  @media only screen and (min-width: 1320px) {
    width: 1300px;
    margin: 0 auto;
    padding: 54px;
  }
`;

export const TitleBox = styled.div`
  text-align: center;
  h4 {
    color: ${theme.color.white};
    font-size: 24px;
    margin-top: 0;
    line-height: 31px;
    margin-bottom: 16px;
  }
  h6 {
    color: ${theme.color.whiteGrey};
    font-size: 16px;
    margin-top: 0;
    line-height: 21px;
    margin-bottom: 27px;
  }
  @media only screen and (min-width: 1024px) {
    h4 {
      font-size: 38px;
      line-height: 49px;
      margin-bottom: 24px;
    }
    h6 {
      font-size: 18px;
      line-height: 49px;
      line-height: 1.5;
      width: 860px;
      margin: 0 auto 38px auto;
    }
  }
`;

export const TableWrapper = styled.div`
  border: 5px solid ${theme.color.green};
  border-radius: 15px;
  padding: 16px;
  background: #292c45;
  @media only screen and (min-width: 650px) {
    padding: 24px;
  }
`;

export const Label = styled.div`
  display: none;
  align-items: center;
  color: ${theme.color.white};
  border-bottom: 1px solid #b8b7bf;
  padding-bottom: 8px;
  margin-bottom: 8px;
  div {
    width: 33.3%;
    font-size: 21px;
    font-weight: 600;
    text-align: left;
  }
  @media only screen and (min-width: 650px) {
    display: flex;
    padding: 12px 0;
  }
`;

export const Row = styled.div`
  display: flex;
  color: ${theme.color.whiteGrey};
  border-bottom: 1px solid #b8b7bf;
  padding-bottom: 8px;
  margin-bottom: 8px;
  flex-direction: column;
  justify-content: center;
  &:last-child {
    border-bottom: none;
  }
  div {
    text-align: left;
    font-size: 14px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    span {
      width: 75px;
      color: ${theme.color.white};
      display: inline-block;
      padding-right: 5px;
    }
    span.id {
      width: 23px;
    }
    span.tribute-id {
      width: 35px;
    }
  }
  @media only screen and (min-width: 650px) {
    flex-direction: row;
    div {
      justify-content: flex-start;
      width: 33.3%;
      font-size: 16px;
      span {
        display: none;
      }
    }
  }
  @media only screen and (min-width: 1024px) {
    div {
      font-size: 21px;
    }
  }
`;

export const PaginationWrapper = styled(Pagination)`
  margin-top: 24px;
  .ant-pagination-item {
    background: transparent;
    border: 1px solid ${theme.color.green};
    a {
      color: ${theme.color.white};
    }
    &:hover {
      background: ${theme.color.green};
    }
    @media only screen and (min-width: 1024px) {
      width: 39px;
      height: 39px;
      a {
        font-size: 16px;
        padding-top: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .ant-pagination-item.ant-pagination-item-active {
    background: ${theme.color.green};
  }

  .ant-pagination-prev,
  .ant-pagination-next {
    button.ant-pagination-item-link {
      background: transparent;
      border: 1px solid ${theme.color.green};
      span {
        color: ${theme.color.white};
      }
    }
    button.ant-pagination-disabled {
      span {
        color: ${theme.color.grey};
      }
    }
    &:hover {
      button.ant-pagination-item-link {
        background: ${theme.color.green};
      }
    }
    @media only screen and (min-width: 1024px) {
      width: 36px;
      height: 36px;
      button {
        font-size: 15px;
        padding-top: 2px;
      }
    }
  }

  .ant-pagination-prev.ant-pagination-disabled,
  .ant-pagination-next.ant-pagination-disabled {
    &:hover {
      button {
        background: transparent;
      }
    }
  }

  .ant-pagination-jump-next,
  .ant-pagination-jump-prev {
    .ant-pagination-item-link {
      .ant-pagination-item-container {
        .ant-pagination-item-ellipsis {
          color: ${theme.color.green};
        }
        .anticon-double-right,
        .anticon-double-left {
          color: ${theme.color.green};
        }
      }
    }
  }
`;
