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
  console.log(type, size);
  switch (type) {
    case ButtonType.FILLED:
      return <FilledButton {...delegated} />;
    case ButtonType.OUTLINED:
      return <OutlinedButton {...delegated} />;
    case ButtonType.LIGHT_FILLED:
      return <LightFilledButton {...delegated} />;
    case ButtonType.CLEAR:
      return <ClearButton {...delegated} />;
  }
}

const StyledButton = styled.button`
  padding: 8px 16px;
  border-radius: 32px;

  font-weight: ${WEIGHTS.normal};
  font-size: ${14 / 16}rem;
  line-height: ${20 / 16}rem;
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

const LightFilledButton = styled(StyledButton)``;

const OutlinedButton = styled(StyledButton)`
  color: ${COLORS.blackblue};
  background-color: transparent;

  border: 2px solid ${COLORS.blackblue};
`;

const ClearButton = styled(StyledButton)``;

export default Button;
