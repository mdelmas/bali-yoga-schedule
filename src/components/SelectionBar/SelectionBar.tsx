import React from "react";
import styled from "styled-components";

import DateSelection from "../DateSelection";
import TimeSelection from "../TimeSelection";

import { Selection, TIME } from "../../types/Selection";
import { Moment } from "moment";

function SelectionBar({
  currentSelection,
  setCurrentSelection,
}: {
  currentSelection: Selection;
  setCurrentSelection: React.Dispatch<React.SetStateAction<Selection>>;
}) {
  const handleDateSelection = (date: Moment) => {
    setCurrentSelection({
      ...currentSelection,
      date: date,
    });
  };
  const handleTimeSelection = (time: TIME | undefined) => {
    setCurrentSelection({
      ...currentSelection,
      time: time,
    });
  };

  return (
    <SelectionBarWrapper>
      <DateSelection
        selected={currentSelection.date}
        handleSelection={handleDateSelection}
      />
      <TimeSelection
        selected={currentSelection.time}
        handleSelection={handleTimeSelection}
      />
    </SelectionBarWrapper>
  );
}

const SelectionBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default SelectionBar;
