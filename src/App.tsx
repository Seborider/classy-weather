import React from "react";
import Input from "./components/input-component";
import Weather from "./components/weather-component";
import { AppProps, AppState } from "./types/types";
import { convertToFlag } from "./helper-functions/helper-function";

class App extends React.Component<AppProps, AppState> {
  state: AppState = {
    location: "",
    isLoading: false,
    displayLocation: "",
    weather: {
      temperature_2m_max: [],
      temperature_2m_min: [],
      time: [],
      weathercode: [],
    },
  };

  fetchWeather = async () => {
    if (this.state.location.length < 2) {
      return this.setState({
        weather: {
          temperature_2m_max: [],
          temperature_2m_min: [],
          time: [],
          weathercode: [],
        },
      });
    }
    try {
      this.setState({ isLoading: true });
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`,
      );
      const geoData = await geoRes.json();
      if (!geoData.results) throw new Error("Location not found");

      const { latitude, longitude, timezone, name, country_code } =
        geoData.results.at(0);
      this.setState({
        displayLocation: `${name} ${convertToFlag(country_code)}`,
      });

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`,
      );
      const weatherData = await weatherRes.json();
      this.setState({ weather: weatherData.daily });
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  setLocation = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ location: e.target.value });

  render() {
    return (
      <div className="app">
        <h1>Classy Weather</h1>
        <Input
          location={this.state.location}
          onChangeLocation={this.setLocation}
        />
        {this.state.isLoading && <p className="loader">Loading...</p>}
        {this.state.weather.weathercode && (
          <Weather
            weather={this.state.weather}
            location={this.state.displayLocation}
          />
        )}
      </div>
    );
  }

  componentDidMount() {
    //this.fetchWeather();
    this.setState({ location: localStorage.getItem("location") || "" });
  }

  componentDidUpdate(
    prevProps: Readonly<AppProps>,
    prevState: Readonly<AppState>,
  ) {
    if (this.state.location !== prevState.location) {
      this.fetchWeather();
      localStorage.setItem("location", this.state.location);
    }
  }
}
export default App;
