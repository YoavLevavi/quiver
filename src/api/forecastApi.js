import axios from "axios";

export const fetchOneCallWeather = async (lat, lng) => {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/3.0/onecall`;
  const { data } = await axios.get(url, {
    params: {
      lat,
      lon: lng,
      units: "metric",
      exclude: "minutely,alerts",
      appid: apiKey,
    },
  });
  return data;
};

export const fetchMarineData = async (lat, lng) => {
  const url = `https://marine-api.open-meteo.com/v1/marine`;
  const { data } = await axios.get(url, {
    params: {
      latitude: lat,
      longitude: lng,
      hourly: "sea_surface_temperature,wave_height,wave_period,wave_direction",
      timezone: "auto",
    },
  });
  return data;
};

export const fetchSunData = async (lat, lng) => {
  const url = `https://api.open-meteo.com/v1/forecast`;
  const { data } = await axios.get(url, {
    params: {
      latitude: lat,
      longitude: lng,
      daily: "sunrise,sunset,uv_index_max",
      timezone: "auto",
    },
  });
  return data;
};

// Fetches weather data for a specific latitude and longitude using the Open Meteo API
export const fetchWeatherData = async (lat, lng) => {
  const url = `https://api.open-meteo.com/v1/forecast`;

  const { data } = await axios.get(url, {
    params: {
      latitude: lat,
      longitude: lng,
      hourly: "temperature_2m,wind_speed_10m,wind_direction_10m",
      forecast_days: 7,
      timezone: "auto",
    },
  });

  return data;
};
