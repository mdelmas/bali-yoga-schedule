import React from "react";
import moment from "moment";

import styled from "styled-components";
import Button from "../Button";
import { WEIGHTS } from "../../constants";
import { ButtonVariant } from "../Button/ButtonParameters";

const DISPLAYED_DATES = 5;

function DateSelection() {
  const dates = React.useMemo(() => {
    return new Array(DISPLAYED_DATES)
      .fill(0)
      .map((_, i) => moment().add(i, "days"));
  }, []);

  const [selected, setSelected] = React.useState(dates[0]);

  return (
    <DateSelectionWrapper>
      {dates.map((date) => (
        <DateWrapper key={crypto.randomUUID()}>
          <Button
            variant={
              date === selected
                ? ButtonVariant.FILLED
                : ButtonVariant.LIGHT_FILLED
            }
            onClick={() => setSelected(date)}
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
`;

const DateWrapper = styled.div`
  min-width: 0;

  flex: 1 0;

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
