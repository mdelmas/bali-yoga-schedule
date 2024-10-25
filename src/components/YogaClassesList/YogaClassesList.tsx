import styled from "styled-components";

import YogaClassLine from "../YogaClassLine";
import { Selection, TIME } from "../../types/Selection";

import useFetchYogaClassesData from "../../hooks/useFetchYogaClassesData";
import moment from "moment";
import { WEIGHTS } from "../../constants";

function YogaClassesList({
  currentSelection,
}: {
  currentSelection: Selection;
}) {
  const { data, isLoading, hasData } = useFetchYogaClassesData(
    currentSelection.date.format("DD/MM/YY")
  );

  const morningTreshold = moment(currentSelection.date).set("hour", 11);
  const eveningTreshold = moment(currentSelection.date).set("hour", 15);

  const classes = data.filter((yogaClass) => {
    if (yogaClass.momentDate.isSameOrBefore(moment())) {
      return false;
    }

    switch (currentSelection.time) {
      case TIME.Morning:
        return yogaClass.momentDate.isBefore(morningTreshold);
      case TIME.Day:
        return yogaClass.momentDate.isBetween(morningTreshold, eveningTreshold);
      case TIME.Evening:
        return yogaClass.momentDate.isAfter(eveningTreshold);
      default:
        return true;
    }
  });

  if (isLoading) {
    return <Message>Loading...</Message>;
  }

  if (!hasData) {
    return <Message>No classes for this day...</Message>;
  }

  if (classes.length === 0) {
    return <Message>No classes for this time of the day...</Message>;
  }

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

const Message = styled.p`
  font-size: ${14 / 16}rem;
  font-weight: ${WEIGHTS.regular};
`;

export default YogaClassesList;
