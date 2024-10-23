import styled from "styled-components";

import YogaClassLine from "../YogaClassLine";
import { FormattedYogaClass } from "../../types/YogaClass";

function YogaClassesList({ classes }: { classes: FormattedYogaClass[] }) {
  return (
    <SchduleWrapper>
      {classes.map((yogaClass, i) => (
        <YogaClassLine
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

export default YogaClassesList;
