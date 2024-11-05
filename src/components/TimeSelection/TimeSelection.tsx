import styled from "styled-components";

import { Sunrise, Sun, Sunset } from "lucide-react";

import { COLORS } from "../../constants";
import Button from "../Button";
import { ButtonVariant } from "../Button/ButtonParameters";

import { TIME } from "../../types/Selection";

type IconType = TIME.Morning | TIME.Day | TIME.Evening;
const iconType = {
  [TIME.Morning]: Sunrise,
  [TIME.Day]: Sun,
  [TIME.Evening]: Sunset,
};

function Icon({
  type,
  selected,
  handleClick,
}: {
  type: IconType;
  selected: boolean;
  handleClick: () => void;
}) {
  const IconContent = iconType[type];

  return (
    <IconWrapper
      variant={selected ? ButtonVariant.FILLED : ButtonVariant.CLEAR}
      onClick={() => handleClick()}
    >
      <IconContent
        size={16}
        color={selected ? COLORS.offwhite : COLORS.blackblue[500]}
        strokeWidth={2}
      />
      <HoverText>{type}</HoverText>
    </IconWrapper>
  );
}

function TimeSelection({
  selected,
  handleSelection,
}: {
  selected: TIME | undefined;
  handleSelection: (time: TIME | undefined) => void;
}) {
  const handleClick = (clicked: TIME) => {
    if (selected === clicked) {
      handleSelection(undefined);
    } else {
      handleSelection(clicked);
    }
  };

  return (
    <TimeSelectionWrapper>
      {(Object.keys(iconType) as IconType[]).map((type) => (
        <Icon
          key={crypto.randomUUID()}
          type={type}
          selected={selected === type}
          handleClick={() => handleClick(type)}
        />
      ))}
    </TimeSelectionWrapper>
  );
}

const TimeSelectionWrapper = styled.div`
  display: flex;

  align-self: center;

  width: fit-content;
  border-radius: 10000px;

  padding: 0px;
  gap: 0px;

  /* background-color: ${COLORS.lightblackblue[500]}; */
`;

const HoverText = styled.span`
  position: absolute;
  bottom: -24px;
  left: 50%;

  background: ${COLORS.lightblackblue[300]};
  color: ${COLORS.blackblue[500]};

  padding: 5px 10px;
  border-radius: 10000px;

  font-size: ${10 / 16}rem;
  line-height: ${16 / 16}rem;

  opacity: 0;
  transition: opacity 0.2s ease;

  pointer-events: none;
`;

const IconWrapper = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 32px;
  height: 32px;
  padding: 0;

  border-radius: 10000px;

  position: relative;

  @media (hover: hover) and (pointer: fine) {
    &:hover ${HoverText} {
      opacity: 1;
    }
  }
`;
/*
const IconButton = styled.button`
  padding: 10px;
  background: #3498db;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;

  &:hover .hoverText {
    opacity: 1;
  }
`;
*/
export default TimeSelection;
