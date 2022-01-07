import styled from "styled-components";
// ******** Theme ********
import * as theme from "../../theme";
// ******** Images ********
import BackgroundImage from "../../assets/background.png";

export const Wrapper = styled.div`
  background-image: url(${BackgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;
  @media only screen and (min-width: 1024px) {
    height: 100%;
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 64px;
  @media only screen and (min-width: 1024px) {
    margin-top: 150px;
  }
  @media only screen and (min-width: 1520px) {
    margin-top: 310px;
  }
`;

export const Title = styled.h1`
  color: ${theme.color.white};
  text-align: center;
  text-transform: uppercase;
  font-size: 28px;
  line-height: 1;
  & > span {
    color: ${theme.color.red};
  }
  @media only screen and (min-width: 1024px) {
    margin: 0 0 24px 0;
    font-size: 54px;
  }
`;

export const Subtitle = styled.h3`
  color: ${theme.color.white};
  text-align: center;
  line-height: 1;
  font-size: 24px;
  margin: 0;
  @media only screen and (min-width: 1024px) {
    font-size: 38px;
  }
`;

export const Button = styled.button`
  background-color: ${theme.color.red};
  color: ${theme.color.white};
  border: none;
  cursor: pointer;
  width: 240px;
  height: 80px;
  border-radius: 400px;
  margin: 32px auto 128px auto;
  font-size: 21px;
  @media only screen and (min-width: 1024px) {
    width: 660px;
    height: 80px;
    border-radius: 400px;
    font-size: 21px;
    margin-top: 64px;
    margin-bottom: 150px;
    transition: ${theme.transition};
    &:hover {
      background-color: ${theme.color.redHover};
    }
  }
  @media screen and (min-height: 1200px) and (min-width: 1300px) {
    margin-bottom: 256px;
  }

`;

export const FooterApp = styled.div`
  background-image: url(${BackgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
`;
