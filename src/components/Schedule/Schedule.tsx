import { useState } from "react";
import styled from "styled-components";
import moment, { Moment } from "moment";

import SelectionBar from "../SelectionBar";
import YogaClassesList from "../YogaClassesList";

export enum TIME {
  All = "",
  Morning = "morning",
  Day = "day",
  Evening = "evening",
}

export type Selection = {
  date: Moment;
  time: TIME;
};

function Schedule() {
  const [currentSelection, setCurrentSelection] = useState<Selection>({
    date: moment(),
    time: TIME.All as TIME,
  });

  console.log(currentSelection.date, currentSelection.time);

  return (
    <ScheduleWrapper>
      <SelectionBar
        currentSelection={currentSelection}
        setCurrentSelection={setCurrentSelection}
      />
      <StyledYogaClassesList currentSelection={currentSelection} />
    </ScheduleWrapper>
  );
}

const StyledYogaClassesList = styled(YogaClassesList)``;
const ScheduleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Schedule;
