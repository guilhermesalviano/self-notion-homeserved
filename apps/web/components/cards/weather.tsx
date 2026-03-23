"use client";

import { useEffect, useRef, useState } from "react";
import { useStatus } from "@/contexts/statusContext";
import Card from "../card";
import { ONE_MINUTE_IN_MS } from "@/constants";

const RAIN_CODES = new Set([51,53,55,56,57,61,63,65,66,67,80,81,82,85,86,95,96,99]);
const STALE_MS = ONE_MINUTE_IN_MS * 30; // 30 minutes

function isRaining(code: number) {
  return RAIN_CODES.has(code);
}

export default function WeatherCard() {
  const [weather, setWeather] = useState<any>();
  const { reportStatus } = useStatus();
  const lastFetchedAt = useRef<number>(0);

  const fetchWeather = async () => {
    try {
      const res = await fetch("/api/weather");
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      setWeather(data.data);
      reportStatus("weather", "success");
      lastFetchedAt.current = Date.now();
    } catch {
      setWeather({ error: "failed" });
      reportStatus("weather", "error");
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible") return;
      const stale = Date.now() - lastFetchedAt.current > STALE_MS;
      if (stale) fetchWeather();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  if (!weather) {
    return <Card className="weather-card">Loading weather...</Card>;
  }

  if (weather.error) {
    return <Card className="weather-card">An error occurred while retrieving data. Please try again later.</Card>;
  }

  const raining = isRaining(weather.code);

  return (
    <Card className={raining ? "weather-card--raining" : "weather-card"}>
      <div className="weather-main">
        <div>
          <div className="weather-city">{weather.city}</div>
          <div className="weather-temp">{weather.temp}°</div>
          <div className="weather-condition">{weather.condition}</div>
          <div className="weather-feels">Sensação {weather.feels}°C</div>
        </div>
        <div className="weather-icon-big">{weather.icon}</div>
      </div>
      <div className="weather-hours">
        {weather.forecast?.map((h: any) => (
          <div key={h.time} className={`weather-hour ${isRaining(h.code) ? "weather-hour--raining" : ""}`}>
            <span className="weather-hour-time">{h.time}</span>
            <span>{h.icon}</span>
            <span className="weather-hour-temp">{h.temp}°</span>
          </div>
        ))}
      </div>
    </Card>
  );
}