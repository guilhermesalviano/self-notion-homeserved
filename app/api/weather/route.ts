import { Weather } from "@/entities/Weather";
import { WeatherHour } from "@/entities/WeatherHour";
import { getDatabaseConnection } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const hours = [
      { time: "14h", temp: 24, icon: "⛅" },
      { time: "15h", temp: 25, icon: "☀️" },
      { time: "16h", temp: 23, icon: "🌦️" },
      { time: "17h", temp: 21, icon: "🌧️" },
      { time: "18h", temp: 20, icon: "🌧️" },
      { time: "19h", temp: 19, icon: "🌙" },
    ];

    const weatherMock = {
      city: "São Paulo",
      temp: 24,
      feels: 22,
      condition: "Parcialmente nublado",
      hours
    };
    const db = await getDatabaseConnection();
    const weatherHourRepository = db.getRepository(WeatherHour);
    await weatherHourRepository.insert(hours);

    const weatherRepository = db.getRepository(Weather);
    const weatherData = await weatherRepository.insert(weatherMock);


    return NextResponse.json({ message: "Weather data retrieved successfully", data: weatherData }, { status: 200 })
  } catch (error: unknown) {
    console.error(error)
    return NextResponse.json({ error: "Failed to retrieve weather data" }, { status: 500 });
  }
}