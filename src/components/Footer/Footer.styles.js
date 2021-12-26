import styled from "styled-components";
// ******** Theme ********
import * as theme from "../../theme";
// ******** Images ********
import OpenSeaImage from "../../assets/opensea_icon.svg";
import OpenSeaImageBlack from "../../assets/opensea_icon_black.svg";
import BackToTopArrow from "../../assets/back-to-top-arrow.png";

export const FooterWrapper = styled.footer`
  background-color: #150520;
  & > .content {
    color: ${theme.color.white};
    padding: 64px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media only screen and (min-width: 1024px) {
      flex-direction: row;
      justify-content: space-between;
    }
    @media only screen and (min-width: 1300px) {
      width: 1300px;
      margin: 0 auto;
      height: 297px;
      padding-top: 92px;
      padding-left: 0;
      padding-right: 0;
    }
  }
  .scroll-to-top {
    background: transparent;
    background-image: url(${BackToTopArrow});
    width: 50px;
    height: 58px;
    color: #fff;
    border-radius: 5px;
    position: fixed;
    bottom: 35px;
    right: 35px;
    border: 0;
    cursor: pointer;
    opacity: 0.8;
    transition: all 0.7s;
    z-index: 9999;
    svg {
      display: none;
    }
    &:hover {
      opacity: 1;
    }
  }
  @media screen and (min-height: 1200px) and (min-width: 1300px) {
    position: ${({ page }) => (page === "connect" ? "fixed" : "static")};
    bottom: 0;
    width: 100%;
  }
`;

export const Logo = styled.div`
  color: ${theme.color.white};
  font-size: 36px;
  margin-bottom: 20px;
  @media only screen and (min-width: 1024px) {
    margin-bottom: 0;
  }
`;

export const Button = styled.a`
  color: ${theme.color.white};
  font-size: 21px;
  width: 174px;
  height: 60px;
  min-height: 60px;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  border-radius: 400px;
  margin-top: 12px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: ${theme.transition};
  background-color: ${theme.color.secondButton};
  font-weight: 600;
  & > svg {
    margin-right: 14px;
  }
  & > span {
    margin-right: 14px;
    background-image: url(${OpenSeaImage});
    background-size: cover;
    background-repeat: no-repeat;
    width: 24px;
    height: 24px;
  }
  &:hover {
    background-color: ${theme.color.white};
    color: ${theme.color.secondButton};
    & > svg {
      color: ${theme.color.secondButton};
    }
    & > span {
      background-image: url(${OpenSeaImageBlack});
    }
  }
  @media only screen and (min-width: 1024px) {
    margin-right: 16px;
    margin-top: 0;
    margin-bottom: 0;
    &:last-child {
      margin-right: 0;
    }
  }
`;

export const SocialWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  @media only screen and (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;
