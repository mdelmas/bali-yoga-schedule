import styled from "styled-components";

import YogaClassLine from "../YogaClassLine";
import { YogaClass } from "../../types/YogaClass";
import { Selection, TIME } from "../../types/Selection";

import useFetchYogaClassesData from "../../hooks/useFetchYogaClassesData";
import { useMemo } from "react";
import moment from "moment";

function YogaClassesList({
  currentSelection,
}: {
  currentSelection: Selection;
}) {
  let classes = useFetchYogaClassesData<YogaClass>(
    currentSelection.date.format("DD/MM/YY")
  );

  classes = useMemo(() => {
    const morningTreshold = moment(currentSelection.date).set("hour", 11);
    const eveningTreshold = moment(currentSelection.date).set("hour", 15);

    return classes.filter((yogaClass) => {
      switch (currentSelection.time) {
        case TIME.Morning:
          return yogaClass.momentDate.isBefore(morningTreshold);
        case TIME.Day:
          return yogaClass.momentDate.isBetween(
            morningTreshold,
            eveningTreshold
          );
        case TIME.Evening:
          return yogaClass.momentDate.isAfter(eveningTreshold);
        default:
          return true;
      }
    });
  }, [classes, currentSelection]);

  return (
    <YogaClassesListWrapper>
      {classes.map((yogaClass, i) => (
        <YogaClassLine
          key={yogaClass.id + i}
          time={yogaClass.momentDate}
          duration={yogaClass.duration}
          name={yogaClass.name}
          studio={yogaClass.studio}
          url={yogaClass.url}
        />
      ))}
    </YogaClassesListWrapper>
  );
}

const YogaClassesListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export default YogaClassesList;
