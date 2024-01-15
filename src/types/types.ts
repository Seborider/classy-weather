import React from "react";

export interface AppProps {}

export interface AppState {
  location: string;
  isLoading: boolean;
  displayLocation: string;
  weather: {
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    time: string[];
    weathercode: number[];
  };
}

export interface DayProps {
  date: string;
  max: number;
  min: number;
  codes: number;
  isToday: boolean;
}

export interface WeatherData {
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  time: string[];
  weathercode: number[];
}

export interface WeatherProps {
  weather: WeatherData;
  location: string;
}

export interface InputProps {
  location: string;
  onChangeLocation: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
