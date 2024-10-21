import { PropsWithChildren } from "react";
import styled from "styled-components";
import { COLORS, WEIGHTS } from "../../constants";
import { ButtonType, ButtonSize } from "./ButtonParameters";

function Button({
  type = ButtonType.FILLED,
  size = ButtonSize.MEDIUM,
  ...delegated
}: PropsWithChildren<{
  type?: ButtonType;
  size?: ButtonSize;
}>) {
  switch (type) {
    case ButtonType.FILLED:
      return <FilledButton size={size} {...delegated} />;
    case ButtonType.OUTLINED:
      return <OutlinedButton size={size} {...delegated} />;
    case ButtonType.LIGHT_FILLED:
      return <LightFilledButton size={size} {...delegated} />;
    case ButtonType.CLEAR:
      return <ClearButton size={size} {...delegated} />;
  }
}

const StyledButton = styled.button<{
  size: ButtonSize;
}>`
  padding: ${(props) =>
    props.size === ButtonSize.MEDIUM ? "8px 16px" : "6px 12px"};

  border-radius: 32px;

  font-weight: ${WEIGHTS.normal};
  font-size: ${(props) => {
    const pxSize = props.size === ButtonSize.MEDIUM ? 14 : 12;
    return pxSize / 16;
  }}rem;
  line-height: ${(props) => {
    const lineHeightPx = props.size === ButtonSize.MEDIUM ? 20 : 16;
    return lineHeightPx / 16;
  }}rem;
`;

const FilledButton = styled(StyledButton)`
  color: ${COLORS.offwhite};
  background-color: ${COLORS.blackblue};

  &:hover {
  }
  &:hover,
  &:focus {
  }
`;

const LightFilledButton = styled(StyledButton)`
  background-color: ${COLORS.lightblackblue};
`;

const OutlinedButton = styled(StyledButton)`
  color: ${COLORS.blackblue};
  background-color: transparent;

  box-shadow: inset 0 0 0 1.2px ${COLORS.blackblue};
`;

const ClearButton = styled(StyledButton)``;

export default Button;
