import React from "react";
import styled from "styled-components";
import DaysContainer from "./DaysContainer";
import Week from "./Week";

const MonthStyles = styled.div`
  width: 400px;
  font-size: 1rem;
  border: solid 1px #bfbfbf;
  padding: 20px;
  -webkit-box-shadow: 6px 7px 5px -4px rgba(199, 199, 199, 1);
  -moz-box-shadow: 6px 7px 5px -4px rgba(199, 199, 199, 1);
  box-shadow: 6px 7px 5px -4px rgba(199, 199, 199, 1);
  h1 {
    display: inline;
    margin: 0 20px;
  }
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0;
  }
  button {
    border: none;
    font-size: 2rem;
    transition: all 0.3s;
  }
  button:hover {
    color: #ff96c2;
  }
`;
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const Month = props => {
  const calculateDaysInMonth = () => {
    //add one to the month because it calculates the last day of the previous month
    return new Date(props.currentYear, props.currentMonth + 1, 0).getDate();
  };

  const getFirstDayOfMonth = () => {
    return new Date(props.currentYear, props.currentMonth, 1).getDay();
  };

  return (
    <MonthStyles>
      <div className="title">
        <button className="button-left" onClick={props.changeMonth} value="<">
          {"<"}
        </button>
        <h1>{`${months[props.currentMonth]} ${props.currentYear}`}</h1>
        <button className="button-right" onClick={props.changeMonth} value=">">
          {">"}
        </button>
      </div>
      <Week />
      <DaysContainer
        days={calculateDaysInMonth()}
        firstDay={getFirstDayOfMonth()}
        handleClick={props.handleClick}
        currentMonth={props.currentMonth}
        currentYear={props.currentYear}
        startDate={props.startDate}
        endDate={props.endDate}
        currentDate={props.currentDate}
      />
    </MonthStyles>
  );
};

export default Month;
