export interface WeatherResponse {
  latitude:              number;
  longitude:             number;
  generationtime_ms:     number;
  utc_offset_seconds:    number;
  timezone:              string;
  timezone_abbreviation: string;
  elevation:             number;
  current_units:         CurrentUnits;
  current:               CurrentWeather;
  hourly_units:          HourlyUnits;
  hourly:                HourlyWeather;
}

export interface CurrentUnits {
  time:                 string;
  interval:             string;
  temperature_2m:       string;
  relative_humidity_2m: string;
  apparent_temperature: string;
  weather_code:         string;
}

export interface CurrentWeather {
  time:                 string;
  interval:             number;
  temperature_2m:       number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  weather_code:         number;
}

export interface HourlyUnits {
  time:           string;
  temperature_2m: string;
  weather_code:   string;
}

export interface HourlyWeather {
  time:           string[];
  temperature_2m: number[];
  weather_code:   number[];
}

interface OpenMeteoProps {
  latitude: string;
  longitude: string;
}

export async function fetchOpenMeteoAPI({latitude, longitude}: OpenMeteoProps): Promise<WeatherResponse> {
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code&hourly=temperature_2m,weather_code&forecast_days=1&timezone=America/Sao_Paulo`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Falha ao buscar dados da API externa");
  }

  const responseJson = await response.json();

  return responseJson;
}