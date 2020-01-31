import React, { Component } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Month from "./components/Month";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: sans-serif;
    text-align: center;
    font-size: 10px;
    box-sizing: border-box;
  }
`;

const MainStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 200px 0;
  label {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 400px;
  }
  input {
    margin: 0 20px;
    padding: 20px;
    font-size: 16px;
  }
  .inputs {
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    min-width: 100%;
    margin-bottom: 30px;
  }
  #start {
    border: ${props =>
      props.picker === "start" ? "solid 1px #ff4f98" : "solid 1px #bfbfbf"};
  }
  #end {
    border: ${props =>
      props.picker === "end" ? "solid 1px #ff4f98" : "solid 1px #bfbfbf"};
  }
`;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //this is set as a date so it doesn't throw an error before it gets the chance to update
      //with the current date
      currentDate: new Date(),
      startDate: "",
      endDate: "",
      currentMonth: "",
      currentYear: "",
      startDateString: "",
      endDateString: "",
      picker: "",
      showPicker: false
    };
  }

  getCurrentDate = () => {
    // setting the date with no arguments makes it so the user can't set today as a start date
    let date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    date = new Date(year, month, day);
    this.setState({
      currentDate: date
    });
  };

  setCurrentMonthAndYear = () => {
    this.setState({
      currentMonth: this.state.currentDate.getMonth(),
      currentYear: this.state.currentDate.getFullYear()
    });
  };

  componentDidMount() {
    this.getCurrentDate();
    this.setCurrentMonthAndYear();
  }

  handleClick = e => {
    let clickedDate = new Date(
      this.state.currentYear,
      this.state.currentMonth,
      e.target.textContent
    );
    let dateArr = clickedDate.toString().split(" ");
    // so the user can't choose a start date in the past
    if (clickedDate < this.state.currentDate) return;
    switch (this.state.picker) {
      case "start":
        this.setState({
          startDateString: `${dateArr[0]}, ${dateArr[1]} ${dateArr[2]}`,
          startDate: clickedDate,
          picker: "end",
          endDate: clickedDate > this.state.endDate ? "" : this.state.endDate,
          endDateString:
            clickedDate > this.state.endDate ? "" : this.state.endDateString
        });
        break;
      case "end":
        // instead of preventing the user from choosing, just set the end date
        // as the start date if it's before the start date
        if (this.state.startDate && clickedDate < this.state.startDate) {
          this.setState({
            startDateString: `${dateArr[0]}, ${dateArr[1]} ${dateArr[2]}`,
            startDate: clickedDate,
            picker: "end",
            endDate: "",
            endDateString: ""
          });
        } else {
          this.setState({
            endDateString: `${dateArr[0]}, ${dateArr[1]} ${dateArr[2]}`,
            // initializing start and end dates as empty strings allow easy checking
            // but also kind of repetitive checks preventing trying to access methods
            // that don't exist
            endDate: !this.state.startDate ? "" : clickedDate,
            startDate: !this.state.startDate
              ? clickedDate
              : this.state.startDate
          });
        }
        break;
      default:
    }
  };

  handleInputClick = e => {
    if (e.target.id === "start") {
      this.setState({ picker: "start", showPicker: true });
    } else if (e.target.id === "end") {
      this.setState({ picker: "end", showPicker: true });
    }
  };

  changeMonth = e => {
    if (e.target.value === "<") {
      if (this.state.currentMonth === 0) {
        this.setState({
          //go to december
          currentMonth: 11,
          currentYear: this.state.currentYear - 1
        });
      } else {
        this.setState({ currentMonth: this.state.currentMonth - 1 });
      }
    } else if (e.target.value === ">") {
      if (this.state.currentMonth === 11) {
        this.setState({
          //go to january
          currentMonth: 0,
          currentYear: this.state.currentYear + 1
        });
      } else {
        this.setState({ currentMonth: this.state.currentMonth + 1 });
      }
    }
  };

  render() {
    return (
      <MainStyle picker={this.state.picker}>
        <div className="inputs">
          <label htmlFor="start">
            Start
            <input
              type="text"
              placeholder="mm/dd/yy"
              id="start"
              value={this.state.startDateString}
              onClick={this.handleInputClick}
              autoFocus={this.state.picker === "start"}
              readOnly
            />
          </label>
          <label htmlFor="end">
            End
            <input
              type="text"
              placeholder="mm/dd/yy"
              id="end"
              value={this.state.endDateString}
              onClick={this.handleInputClick}
              autoFocus={this.state.picker === "end"}
              readOnly
            />
          </label>
        </div>
        {this.state.showPicker ? (
          <Month
            handleClick={this.handleClick}
            changeMonth={this.changeMonth}
            currentMonth={this.state.currentMonth}
            currentYear={this.state.currentYear}
            currentDate={this.state.currentDate}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
          />
        ) : null}

        <GlobalStyle />
      </MainStyle>
    );
  }
}
