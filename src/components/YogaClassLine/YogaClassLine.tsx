import styled from "styled-components";
import { COLORS, QUERIES, WEIGHTS } from "../../constants";

import { Moment } from "moment";

function YogaClassLine({
  time,
  duration,
  name,
  studio,
  url,
}: {
  time: Moment;
  duration: number;
  name: string;
  studio: string;
  url: string;
}) {
  return (
    <ScheduleLineWrapper href={url} target="_blank" rel="noopener noreferrer">
      <TimeWrapper>
        <Time>{time.format("h:mmA")}</Time>
        {!Number.isNaN(duration) && <Duration>{duration}’</Duration>}
      </TimeWrapper>

      <Name>{name}</Name>
      <Studio>{studio}</Studio>
    </ScheduleLineWrapper>
  );
}

const ScheduleLineWrapper = styled.a`
  display: flex;
  align-items: center;
  gap: clamp(${16 / 16}rem, 8vw - ${16 / 16}rem, ${32 / 16}rem);

  padding: 4px 8px;
  border-radius: 10000px;

  pointer-events: auto;

  &:hover {
    background-color: ${COLORS.lightblackblue[300]};
  }
`;

const TimeWrapper = styled.div`
  display: flex;

  gap: 8px;

  width: 104px;
`;

const Time = styled.span`
  font-size: ${11 / 16}rem;
  line-height: ${18 / 16}rem;
  font-weight: ${WEIGHTS.light};

  width: clamp(${32 / 16}rem, 32vw - ${64 / 16}rem, ${64 / 16}rem);

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  text-align: right;
`;

const Duration = styled.span`
  padding: 2px 0px;
  border-radius: 10000px;

  box-shadow: inset 0 0 0 1px;

  line-height: ${14 / 16}rem;
  font-size: ${10 / 16}rem;
  font-weight: ${WEIGHTS.medium};

  text-align: center;
  width: 32px;

  display: none;
  @media ${QUERIES.tabletAndUp} {
    display: block;
  }
`;

const Name = styled.span`
  font-size: ${14 / 16}rem;
  font-weight: ${WEIGHTS.medium};

  flex: 2;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Studio = styled.span`
  font-size: ${14 / 16}rem;
  font-weight: ${WEIGHTS.light};
  font-style: italic;

  flex: 1;
  max-width: 128px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default YogaClassLine;
