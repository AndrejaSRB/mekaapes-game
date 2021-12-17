import styled from "styled-components";
// ******** Theme ********
import * as theme from "../../theme";
// ******** Components ********
import { Drawer } from "antd";

export const DrawerWrapper = styled(Drawer)`
  & > .ant-drawer-content-wrapper {
    height: 376px;
    border-radius: 15px 0px 0px 15px;
    & > .ant-drawer-content {
      background-color: #292c45;
      & > .ant-drawer-wrapper-body {
        & > .ant-drawer-body {
          padding: 0;
        }
      }
    }
    @media only screen and (min-width: 789px) {
      height: 100%;
    }
  }
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${theme.color.white};
  padding-bottom: 16px;
  padding: 32px 32px 16px 32px;
  border-bottom: 1px solid ${theme.color.whiteGrey};
  & > div {
    font-size: 16px;
    & > span {
      color: ${theme.color.whiteGrey};
      margin-right: 8px;
    }
  }
  & > span {
    & > span > svg {
      font-size: 20px;
      color: ${theme.color.white};
      cursor: pointer;
    }
  }
`;

export const NavList = styled.div`
  padding: 26px 32px 32px 32px;
  div > a {
    font-size: 21px;
    color: ${theme.color.white};
    cursor: pointer;
    margin: 8px 0;
    font-weight: 600;
    border-bottom: 3px solid transparent;
    transition: ${theme.transition};
    display: inline-block;
    line-height: 1;
    &:hover {
      color: ${theme.color.green};
      border-bottom: 3px solid ${theme.color.green};
    }
    &.active {
      color: ${theme.color.green};
      border-bottom: 3px solid ${theme.color.green};
    }
  }
`;
