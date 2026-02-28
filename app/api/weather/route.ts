import { Weather } from "@/entities/Weather";
import { WeatherHour } from "@/entities/WeatherHour";
import { getDatabaseConnection } from "@/lib/db";
import { fetchNominatimAPI } from "@/services/nominatim-api";
import { fetchOpenMeteoAPI, WeatherResponse } from "@/services/open-meteo-api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const latitude = "-16.3641821"
    const longitude = "-48.9729667"

    const data = await fetchOpenMeteoAPI({ latitude, longitude });

    const hours: any[] = data.hourly.time.slice(0, 6).map((t: string, index: number) => {
      return {
        timestamp: t,
        time: new Date(t).toLocaleTimeString("pt-BR", { hour: "2-digit" }) + "h",
        temp: Math.round(data.hourly.temperature_2m[index]),
        icon: getWeatherIcon(data.hourly.weather_code[index])
      };
    });

    const db = await getDatabaseConnection();
    const weatherHourRepository = db.getRepository(WeatherHour);
    await weatherHourRepository.insert(hours);

    const location = await fetchNominatimAPI({ latitude, longitude });

    const weatherMock =  {
      date: "2026-02-28",
      city: location.address.city,
      state: location.address.state,
      temp: Math.round(data.current.temperature_2m),
      feels: Math.round(data.current.apparent_temperature),
      condition: getWeatherCondition(data.current.weather_code),
      forecast: hours
    };

    const weatherRepository = db.getRepository(Weather);
    const weatherData = await weatherRepository.insert(weatherMock);


    return NextResponse.json({ message: "Weather data retrieved successfully", data: weatherData }, { status: 200 })
  } catch (error: unknown) {
    console.error(error)
    return NextResponse.json({ error: "Failed to retrieve weather data" }, { status: 500 });
  }
}

function getWeatherIcon(code: number) {
  if (code === 0) return "☀️";
  if (code <= 3) return "☁️";
  if (code >= 45) return "🌧️";
  return "🌤️";
}

function getWeatherCondition(code: number) {
  if (code === 0) return "Céu Limpo";
  if (code <= 3) return "Parcialmente Nublado";
  return "Chuva/Neblina";
}