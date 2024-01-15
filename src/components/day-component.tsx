import React from "react";
import { DayProps } from "../types/types";
import { getWeatherIcon, formatDay } from "../helper-functions/helper-function";

class Day extends React.Component<DayProps> {
  render() {
    const { date, max, min, codes, isToday } = this.props;
    return (
      <li className="day">
        <span>{getWeatherIcon(codes)}</span>
        <p>{isToday ? "Today" : formatDay(date)}</p>
        <p>
          {Math.floor(min)}&deg; &mdash; <strong>{Math.ceil(max)}&deg;</strong>
        </p>
      </li>
    );
  }
}

export default Day;
