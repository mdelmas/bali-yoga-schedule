import React from "react";
import moment, { Moment } from "moment";

import styled from "styled-components";
import Button from "../Button";
import { WEIGHTS } from "../../constants";
import { ButtonVariant } from "../Button/ButtonParameters";

const DISPLAYED_DATES = 5;

function DateSelection({
  selected,
  handleSelection,
}: {
  selected: Moment;
  handleSelection: (moment: Moment) => void;
}) {
  const dates = React.useMemo(() => {
    return new Array(DISPLAYED_DATES)
      .fill(0)
      .map((_, i) => moment().add(i, "days"));
  }, []);

  return (
    <DateSelectionWrapper>
      {dates.map((date) => (
        <DateWrapper key={crypto.randomUUID()}>
          <Button
            variant={
              date.isSame(selected, "day")
                ? ButtonVariant.FILLED
                : ButtonVariant.LIGHT_FILLED
            }
            onClick={() => handleSelection(date)}
          >
            <Day>
              {date
                .calendar(null, {
                  sameDay: "[Today]",
                  nextDay: "[Tomorrow]",
                  nextWeek: "dddd",
                })
                .toLowerCase()}
            </Day>
            <Date>{date.format("Do MMM").toLowerCase()}</Date>
          </Button>
        </DateWrapper>
      ))}
    </DateSelectionWrapper>
  );
}

const DateSelectionWrapper = styled.div`
  display: flex;
  gap: 16px;

  height: 1lh;
  line-height: ${48 / 16}rem;

  flex-wrap: wrap;
  overflow: hidden;
`;

const DateWrapper = styled.div`
  flex: 1 0;

  height: 100%;
  min-width: 96px;

  button {
    width: 100%;
    text-align: center;
  }
`;

const Day = styled.p`
  font-size: ${12 / 16}rem;
  font-weight: ${WEIGHTS.medium};

  overflow: hidden;

  text-overflow: ellipsis;
`;
const Date = styled.p`
  font-size: ${8 / 16}rem;
  font-weight: ${WEIGHTS.light};
  line-height: ${12 / 16}rem;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default DateSelection;
