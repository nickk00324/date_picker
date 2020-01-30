import React from "react";
import styled from "styled-components";

const WeekStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 400px;
  color: #aaa;
`;

const Week = props => (
  <WeekStyles>
    <p>Su</p>
    <p>Mo</p>
    <p>Tu</p>
    <p>We</p>
    <p>Th</p>
    <p>Fr</p>
    <p>Sa</p>
  </WeekStyles>
);

export default Week;
