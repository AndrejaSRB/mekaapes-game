import styled from "styled-components";
// ******** Theme ********
import * as theme from "../../theme";
// ******** Image ********
import BackgroundImage from "../../assets/background.png";

export const Wrapper = styled.div`
  background-image: url(${BackgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: scenter;
  padding: 16px;
`;
export const Image = styled.div`
  text-align: center;
  img {
    max-height: 140px;
  }
`;
export const Title = styled.div`
  color: ${theme.color.white};
  text-align: center;
  margin-top: 16px;
  font-size: 28px;
  @media only screen and (min-width: 1024px) {
    margin-top: 32px;
    font-size: 40px;
  }
`;
export const Text = styled.div`
  text-align: center;
  color: ${theme.color.whiteGrey};
  font-size: 16px;
  max-width: 420px;
  margin: 16px auto 0 auto;
  @media only screen and (min-width: 1024px) {
    font-size: 24px;
    max-width: 1024px;
    span {
        display: block;
    }
  }
`;
