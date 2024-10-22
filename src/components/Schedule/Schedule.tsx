import styled from "styled-components";

import ScheduleLine from "../ScheduleLine";
import { FormattedYogaClass } from "../../types/YogaClass";

function Schedule({ classes }: { classes: FormattedYogaClass[] }) {
  return (
    <SchduleWrapper>
      {classes.map((yogaClass, i) => (
        <ScheduleLine
          key={yogaClass.id + i}
          time={yogaClass.time}
          duration={yogaClass.duration}
          name={yogaClass.name}
          studio={yogaClass.studio}
          url={yogaClass.url}
        />
      ))}
    </SchduleWrapper>
  );
}

const SchduleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export default Schedule;
