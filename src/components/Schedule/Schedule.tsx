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

const ScheduleWrapper = styled.div`
  display: flex;
  flex-direction: column;

  flex: 1;

  gap: 32px;
`;

const StyledYogaClassesList = styled(YogaClassesList)`
  flex: 1;
`;

export default Schedule;
