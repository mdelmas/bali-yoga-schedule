import styled from "styled-components";

import YogaClassLine from "../YogaClassLine";
import { Selection, TIME } from "../../types/Selection";

import useFetchYogaClassesData from "../../hooks/useFetchYogaClassesData";
import moment from "moment";
import { WEIGHTS } from "../../constants";
import Loader from "../Loader";

function YogaClassesList({
  currentSelection,
}: {
  currentSelection: Selection;
}) {
  let { data, isLoading, hasData } = useFetchYogaClassesData(
    currentSelection.date.format("DD/MM/YY")
  );

  isLoading = true;

  if (isLoading) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  }

  if (!hasData) {
    return <Message>No classes for this day...</Message>;
  }

  const morningTreshold = moment(currentSelection.date).set({
    hour: 11,
    minute: 0,
  });
  const eveningTreshold = moment(currentSelection.date).set({
    hour: 15,
    minute: 0,
  });

  let classes = data
    .sort((classA, classB) => classA.date.diff(classB.date))
    .filter((yogaClass) => {
      if (yogaClass.date.isSameOrBefore(moment())) {
        return false;
      }
      return true;
    });

  if (classes.length === 0) {
    return <Message>No more classes for this day...</Message>;
  }

  classes = classes.filter((yogaClass) => {
    switch (currentSelection.time) {
      case TIME.Morning:
        return yogaClass.date.isBefore(morningTreshold);
      case TIME.Day:
        return yogaClass.date.isBetween(morningTreshold, eveningTreshold);
      case TIME.Evening:
        return yogaClass.date.isAfter(eveningTreshold);
      default:
        return true;
    }
  });

  if (classes.length === 0) {
    return <Message>No classes for this time of the day...</Message>;
  }

  return (
    <YogaClassesListWrapper>
      {classes.map((yogaClass, i) => (
        <YogaClassLine
          key={yogaClass.id + i}
          time={yogaClass.date}
          duration={yogaClass.duration}
          name={yogaClass.name}
          studio={yogaClass.studio}
          url={yogaClass.url}
        />
      ))}
    </YogaClassesListWrapper>
  );
}

const LoaderWrapper = styled.div`
  margin: 32px auto;
`;

const YogaClassesListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Message = styled.p`
  font-size: ${12 / 16}rem;
  font-weight: ${WEIGHTS.regular};

  padding: 0 ${8 / 16}rem;

  text-align: center;
`;

export default YogaClassesList;
