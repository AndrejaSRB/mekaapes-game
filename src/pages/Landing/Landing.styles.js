import styled from "styled-components";
import * as theme from "../../theme";

export const Title = styled.h1`
  color: ${theme.color.red};
  text-align: center;
`;

export const Wrapper = styled.div`
  text-align: center;
  & > button {
    background-color: ${theme.color.red};
    color: ${theme.color.white};
    border: none;
    margin: 0 5px;
    cursor: pointer;
  }
`;
