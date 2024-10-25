import React from "react";
import styled from "styled-components";

import DateSelection from "../DateSelection";
import TimeSelection from "../TimeSelection";

import { Selection, TIME } from "../Schedule";
import { Moment } from "moment";

/*
{
  currentSelection,
  setCurrentSelection,
}: {
  currentSelection: Selection;
  setCurrentSelection React.Dispatch<React.SetStateAction<Selection>>];
}
*/

function SelectionBar({
  currentSelection,
  setCurrentSelection,
}: {
  currentSelection: Selection;
  setCurrentSelection: React.Dispatch<React.SetStateAction<Selection>>;
}) {
  console.log(currentSelection.date, currentSelection.time);

  const handleDateSelection = (date: Moment) => {
    console.log("in handleDateSelection", date);

    setCurrentSelection({
      ...currentSelection,
      date: date,
    });
  };
  const handleTimeSelection = (time: TIME) => {
    console.log("in handleTimeSelection", time);

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
