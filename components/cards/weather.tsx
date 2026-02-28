"use client";

import { useEffect, useState } from "react";
import { Weather } from "@/entities/Weather";
import Card from "./card";

export default function WeatherCard() {
  const [weather, setWeather] = useState<Weather>();

  useEffect(() => {
    fetch("/api/weather")
      .then((res) => res.json())
      .then((data) => setWeather(data.data));
  }, []);

  if (!weather) {
    return <Card className="weather-card">Carregando clima...</Card>;
  }
  return (
    <Card className="weather-card">
      <div className="weather-main">
        <div>
          <div className="weather-city">{weather.city}</div>
          <div className="weather-temp">{weather.temp}°</div>
          <div className="weather-condition">{weather.condition}</div>
          <div className="weather-feels">Sensação {weather.feels}°C</div>
        </div>
        <div className="weather-icon-big">🌤</div>
      </div>
      <div className="weather-hours">
        {weather.forecast?.map((h: any) => (
          <div key={h.time} className="weather-hour">
            <span className="weather-hour-time">{h.time}</span>
            <span>{h.icon}</span>
            <span className="weather-hour-temp">{h.temp}°</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
