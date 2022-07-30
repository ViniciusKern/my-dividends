import styled, { css } from "styled-components";
import { ThemeProps } from "../../assets/styles/themes";

type Props = {
  theme: ThemeProps;
  variant?: "primary" | "secondary";
  danger?: boolean;
};

export default styled.button<Props>`
  height: 52px;
  padding: 0 16px;
  border: none;
  background: ${({ theme }) => theme.colors.primary.main};
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  border-radius: 4px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  transition: background 0.1s ease-in;

  img {
    width: 18px;
    height: 18px;
    filter: invert();
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primary.light};
  }

  &:active {
    background: ${({ theme }) => theme.colors.primary.dark};
  }

  &[disabled] {
    background: #ccc;
    cursor: default;
  }

  ${({ theme, danger }) =>
    danger &&
    css`
      background: ${theme.colors.danger.main};

      &:hover {
        background: ${theme.colors.danger.light};
      }

      &:active {
        background: ${theme.colors.danger.dark};
      }
    `}

  ${({ theme, variant }) =>
    variant === "secondary" &&
    css`
      background: #fff;
      border: solid 1px ${theme.colors.primary.main};
      color: ${theme.colors.primary.main};

      &:hover {
        color: #fff;
      }
    `}
`;
