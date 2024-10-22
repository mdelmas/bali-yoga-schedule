import React from "react";
import styled from "styled-components";

import { Sunrise, Sun, Sunset } from "lucide-react";

import { COLORS } from "../../constants";

type IconType = "morning" | "day" | "evening";
const iconType = {
  morning: Sunrise,
  day: Sun,
  evening: Sunset,
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
  console.log(IconContent);

  return (
    <IconWrapper
      className={selected ? "selected" : undefined}
      onClick={() => handleClick()}
    >
      <IconContent
        size={16}
        color={selected ? COLORS.offwhite : COLORS.blackblue[500]}
        strokeWidth={2}
      />
    </IconWrapper>
  );
}

function TimeSelection() {
  const [selected, setSelected] = React.useState<string | undefined>(undefined);

  const handleClick = (clicked: keyof typeof iconType) => {
    if (selected === clicked) {
      setSelected(undefined);
    } else {
      setSelected(clicked);
    }
  };

  return (
    <TimeSelectionWrapper>
      {(Object.keys(iconType) as IconType[]).map((type) => (
        <Icon
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

  width: fit-content;
  border-radius: 32px;

  padding: 0px;
  gap: 0px;

  background-color: ${COLORS.lightblackblue};
`;

const IconWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 32px;
  height: 32px;

  &.selected {
    color: ${COLORS.offwhite};
    background-color: ${COLORS.blackblue[500]};
    border-radius: 32px;
  }
`;

export default TimeSelection;