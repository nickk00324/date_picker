import React from "react";
import Day from "./Day";
import styled from "styled-components";

const DaysContainerStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  div:first-child {
    grid-column: ${props => props.firstDay + 1};
  }
`;

const DaysContainer = props => {
  const isIncludedInSelection = date => {
    if (date > props.startDate && date < props.endDate) {
      return true;
    }
    return false;
  };

  const isSelected = date => {
    // checks all variations of start and end dates before trying to access
    // methods that might not exist i.e. one of them is the initial empty string value
    if (!props.startDate && !props.endDate) return false;
    else if (!props.endDate && props.startDate) {
      return props.startDate.getTime() === date.getTime();
    } else if (!props.startDate && props.endDate) {
      return props.endDate.getTime() === date.getTime();
    } else {
      return (
        props.startDate.getTime() === date.getTime() ||
        props.endDate.getTime() === date.getTime()
      );
    }
  };
  const populateDays = () => {
    let days = [];
    for (let i = 1; i <= props.days; i++) {
      // so the Day component has full access to the date object in the future if necessary
      const date = new Date(props.currentYear, props.currentMonth, i);
      days.push(
        <Day
          handleClick={props.handleClick}
          isIncludedInSelection={isIncludedInSelection(date)}
          isSelected={isSelected(date)}
          day={i}
          key={date}
        />
      );
    }
    return days;
  };

  return (
    <DaysContainerStyles firstDay={props.firstDay}>
      {populateDays()}
    </DaysContainerStyles>
  );
};

export default DaysContainer;
