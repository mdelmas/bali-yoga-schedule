import styled from "styled-components";
import { COLORS, WEIGHTS } from "../../constants";

function ScheduleLine({
  time,
  duration,
  name,
  studio,
  url,
}: {
  time: Date;
  duration: number;
  name: string;
  studio: string;
  url: string;
}) {
  return (
    <ScheduleLineWrapper href={url}>
      <TimeWrapper>
        <Time>
          {time.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </Time>
        <Duration>{duration}’</Duration>
      </TimeWrapper>

      <Name>{name}</Name>
      <Studio>{studio}</Studio>
    </ScheduleLineWrapper>
  );
}

const ScheduleLineWrapper = styled.a`
  display: flex;
  align-items: center;
  gap: 32px;

  padding: 4px 8px;
  border-radius: 32px;

  &:hover {
    background-color: ${COLORS.lightblackblue[500]};
  }
`;

const TimeWrapper = styled.div`
  display: flex;

  gap: 8px;
`;

const Time = styled.span`
  font-size: ${12 / 16}rem;
  font-weight: ${WEIGHTS.light};

  width: 64px;

  text-align: right;
`;

const Duration = styled.span`
  padding: 2px 0px;
  border-radius: 20px;

  box-shadow: inset 0 0 0 1px ${COLORS.blackblue[500]};

  line-height: ${14 / 16}rem;
  font-size: ${10 / 16}rem;
  font-weight: ${WEIGHTS.medium};

  text-align: center;
  width: 32px;
`;

const Name = styled.span`
  font-size: ${16 / 16}rem;
  font-weight: ${WEIGHTS.semibold};

  flex: 2;
`;

const Studio = styled.span`
  font-size: ${14 / 16}rem;
  font-weight: ${WEIGHTS.light};
  font-style: italic;

  flex: 1;
  max-width: 128px;
`;

export default ScheduleLine;
