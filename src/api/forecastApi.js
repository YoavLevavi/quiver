import axios from "axios";

// Validation helper functions
const validateLatitude = (lat) => {
  const num = parseFloat(lat);
  return !isNaN(num) && num >= -90 && num <= 90 ? num : null;
};

const validateLongitude = (lng) => {
  const num = parseFloat(lng);
  return !isNaN(num) && num >= -180 && num <= 180 ? num : null;
};

/**
 * Fetches weather data from the OpenWeather One Call API for a given latitude and longitude.
 *
 * @async
 * @function fetchOneCallWeather
 * @param {number} lat - The latitude of the location.
 * @param {number} lng - The longitude of the location.
 * @returns {Promise<Object>} The weather data returned by the API.
 * @throws {Error} If the API request fails.
 */
export const fetchOneCallWeather = async (lat, lng) => {
  // Validate input parameters
  const validLat = validateLatitude(lat);
  const validLng = validateLongitude(lng);

  if (validLat === null || validLng === null) {
    throw new Error("Invalid latitude or longitude values");
  }

  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/3.0/onecall`;
  const { data } = await axios.get(url, {
    params: {
      lat: validLat,
      lon: validLng,
      units: "metric",
      exclude: "minutely,alerts",
      appid: apiKey,
    },
  });
  return data;
};

/**
 * Fetches marine data from the Open-Meteo Marine API for a given latitude and longitude.
 *
 * @async
 * @function fetchMarineData
 * @param {number} lat - The latitude of the location.
 * @param {number} lng - The longitude of the location.
 * @returns {Promise<Object>} The marine data returned by the API.
 * @throws {Error} If the API request fails.
 */
export const fetchMarineData = async (lat, lng) => {
  // Validate input parameters
  const validLat = validateLatitude(lat);
  const validLng = validateLongitude(lng);

  if (validLat === null || validLng === null) {
    throw new Error("Invalid latitude or longitude values");
  }

  const url = `https://marine-api.open-meteo.com/v1/marine`;
  const { data } = await axios.get(url, {
    params: {
      latitude: validLat,
      longitude: validLng,
      hourly: "sea_surface_temperature,wave_height,wave_period,wave_direction",
      timezone: "auto",
    },
  });
  return data;
};

/**
 * Fetches sun-related data (sunrise, sunset, UV index) from the Open-Meteo API for a given latitude and longitude.
 *
 * @async
 * @function fetchSunData
 * @param {number} lat - The latitude of the location.
 * @param {number} lng - The longitude of the location.
 * @returns {Promise<Object>} The sun-related data returned by the API.
 * @throws {Error} If the API request fails.
 */
export const fetchSunData = async (lat, lng) => {
  // Validate input parameters
  const validLat = validateLatitude(lat);
  const validLng = validateLongitude(lng);

  if (validLat === null || validLng === null) {
    throw new Error("Invalid latitude or longitude values");
  }

  const url = `https://api.open-meteo.com/v1/forecast`;
  const { data } = await axios.get(url, {
    params: {
      latitude: validLat,
      longitude: validLng,
      daily: "sunrise,sunset,uv_index_max",
      timezone: "auto",
    },
  });
  return data;
};

/**
 * Fetches general weather data (temperature, wind speed, wind direction) from the Open-Meteo API for a given latitude and longitude.
 *
 * @async
 * @function fetchWeatherData
 * @param {number} lat - The latitude of the location.
 * @param {number} lng - The longitude of the location.
 * @returns {Promise<Object>} The weather data returned by the API.
 * @throws {Error} If the API request fails.
 */
export const fetchWeatherData = async (lat, lng) => {
  // Validate input parameters
  const validLat = validateLatitude(lat);
  const validLng = validateLongitude(lng);

  if (validLat === null || validLng === null) {
    throw new Error("Invalid latitude or longitude values");
  }

  const url = `https://api.open-meteo.com/v1/forecast`;

  const { data } = await axios.get(url, {
    params: {
      latitude: validLat,
      longitude: validLng,
      hourly: "temperature_2m,wind_speed_10m,wind_direction_10m",
      forecast_days: 7,
      timezone: "auto",
    },
  });

  return data;
};
