import React from "react";
import styled from "styled-components";

const DayStyles = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  padding: 10px;
  color: ${props => {
    if (props.isInvalid) {
      return "#aaa";
    } else {
      return "#000";
    }
  }};
  :hover {
    background: ${props => {
      return props.isInvalid ? "transparent" : "#3bf5ff";
    }};
  }
  transition: all 0.3s;
  background: ${props => {
    if (props.isSelected) {
      return "#ff4f98";
    } else if (props.isIncludedInSelection) {
      return "#ff96c2";
    } else {
      return "transparent";
    }
  }};
`;

const Day = props => {
  return (
    <DayStyles
      isSelected={props.isSelected}
      isIncludedInSelection={props.isIncludedInSelection}
      isInvalid={props.isInvalid}
      // TODO fix the prop drilling that is going on here
      onClick={props.handleClick}
    >
      {props.day}
    </DayStyles>
  );
};

export default Day;
