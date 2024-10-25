import { useState } from "react";
import styled from "styled-components";
import moment from "moment";

import SelectionBar from "../SelectionBar";
import YogaClassesList from "../YogaClassesList";
import { TIME, Selection } from "../../types/Selection";

function Schedule() {
  const [currentSelection, setCurrentSelection] = useState<Selection>({
    date: moment(),
    time: TIME.All as TIME,
  });

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
