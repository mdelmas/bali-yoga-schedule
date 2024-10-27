import { ButtonHTMLAttributes, ReactNode } from "react";
import styled from "styled-components";
import { COLORS, WEIGHTS } from "../../constants";
import { ButtonVariant, ButtonSize } from "./ButtonParameters";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

function Button({
  variant = ButtonVariant.FILLED,
  size = ButtonSize.MEDIUM,
  ...delegated
}: ButtonProps) {
  switch (variant) {
    case ButtonVariant.FILLED:
      return <FilledButton size={size} {...delegated} />;
    case ButtonVariant.OUTLINED:
      return <OutlinedButton size={size} {...delegated} />;
    case ButtonVariant.LIGHT_FILLED:
      return <LightFilledButton size={size} {...delegated} />;
    case ButtonVariant.CLEAR:
      return <ClearButton size={size} {...delegated} />;
  }
}

const StyledButton = styled.button<{
  size: ButtonSize;
}>`
  padding: ${(props) =>
    props.size === ButtonSize.MEDIUM ? "8px 16px" : "6px 12px"};

  border-radius: 10000px;

  font-weight: ${WEIGHTS.regular};
  font-size: ${(props) => {
    const pxSize = props.size === ButtonSize.MEDIUM ? 14 : 12;
    return pxSize / 16;
  }}rem;
  line-height: ${(props) => {
    const lineHeightPx = props.size === ButtonSize.MEDIUM ? 20 : 16;
    return lineHeightPx / 16;
  }}rem;

  pointer-events: auto;
`;

const FilledButton = styled(StyledButton)`
  color: ${COLORS.offwhite};
  background-color: ${COLORS.blackblue[500]};

  &:hover,
  &:focus {
    background-color: ${COLORS.blackblue[400]};
  }
`;

const LightFilledButton = styled(StyledButton)`
  background-color: ${COLORS.lightblackblue[500]};

  &:hover,
  &:focus {
    background-color: ${COLORS.lightblackblue[700]};
  }
`;

const OutlinedButton = styled(StyledButton)`
  color: ${COLORS.blackblue};
  background-color: transparent;

  box-shadow: inset 0 0 0 1.2px ${COLORS.blackblue[500]};

  &:hover,
  &:focus {
    background-color: ${COLORS.lightblackblue[300]};
  }
`;

const ClearButton = styled(StyledButton)`
  &:hover,
  &:focus {
    background-color: ${COLORS.lightblackblue[300]};
  }
`;

export default Button;
