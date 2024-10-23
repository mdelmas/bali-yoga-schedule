import React from "react";
import styled from "styled-components";

import DateSelection from "../DateSelection";
import TimeSelection from "../TimeSelection";

function SelectionBar() {
  return (
    <SelectionBarWrapper>
      <DateSelection />
      <TimeSelection />
    </SelectionBarWrapper>
  );
}

const SelectionBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default SelectionBar;
