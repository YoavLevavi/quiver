// Function to build day slots for detailed forecast
export const buildDaySlots = ({ marineJson, weatherJson, dateStr }) => {
  const marineTimes = marineJson.hourly?.time || [];
  const waveHeights = marineJson.hourly?.wave_height || [];
  const periods = marineJson.hourly?.wave_period || [];
  const waveDirections = marineJson.hourly?.wave_direction || [];
  const weatherTimes = weatherJson.hourly?.time || [];
  const temps = weatherJson.hourly?.temperature_2m || [];
  const windSpeeds = weatherJson.hourly?.wind_speed_10m || [];
  const windDirections = weatherJson.hourly?.wind_direction_10m || [];

  const weatherMap = new Map();
  weatherTimes.forEach((time, i) => {
    weatherMap.set(time, {
      temp: temps[i],
      windSpeed: windSpeeds[i],
      windDirection: windDirections[i],
    });
  });
  //
  const slots = [];
  marineTimes.forEach((time, i) => {
    if (time.startsWith(dateStr)) {
      const weatherDataForSlot = weatherMap.get(time) || {};
      slots.push({
        time: time.split("T")[1],
        waveHeight: Math.round((waveHeights[i] ?? 0) * 10) / 10, // Round to the closest tenth
        period: periods[i],
        waveDirection: waveDirections[i],
        airTemp: weatherDataForSlot.temp,
        windSpeed: weatherDataForSlot.windSpeed,
        windDirection: weatherDataForSlot.windDirection,
      });
    }
  });

  return slots;
};
