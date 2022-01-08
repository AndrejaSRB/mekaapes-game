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

export const Title = styled.div`
  font-size: 24px;
  margin-bottom: 16px;
`;

export const Counter = styled.div`
  display: flex;
  justify-content: center;
`;

export const Box = styled.div`
  margin-right: 15px;
  p {
      color: ${theme.color.grey};
  }
  &:last-child {
    margin-right: 0;
  }
`;

export const Text = styled.div`
  font-size: 24px;
  margin-bottom: 16px;
`;
