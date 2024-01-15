import React from "react";
import Day from "./day-component";
import { WeatherProps } from "../types/types";

class Weather extends React.Component<WeatherProps> {
  componentWillUnmount() {
    console.log("Weather will unmount");
  }

  render() {
    const {
      temperature_2m_max: max,
      temperature_2m_min: min,
      time: dates,
      weathercode: codes,
    } = this.props.weather;

    return (
      <div>
        <h2>Weather in {this.props.location}</h2>
        <ul className="weather">
          {dates.map((date: string, i: number) => (
            <Day
              date={date}
              max={max.at(i) as number}
              min={min.at(i) as number}
              codes={codes.at(i) as number}
              key={date}
              isToday={i === 0}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default Weather;
