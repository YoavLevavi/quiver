import { toMeters } from "./conversions";

export const getWaveHeightBg = (height) => {
  const waveSize = Number(height) || 0;
  if (waveSize >= 8) return "bg-blue-800"; // Very large waves
  if (waveSize >= 6) return "bg-blue-700"; // Large waves
  if (waveSize >= 4) return "bg-blue-600"; // Medium-large waves
  if (waveSize >= 3) return "bg-blue-500"; // Medium waves
  if (waveSize >= 2) return "bg-blue-400"; // Small-medium waves
  if (waveSize >= 1) return "bg-blue-300"; // Small waves
  return "bg-blue-200"; // Very small waves
};

export const calculateWaveQualityRating = (slot) => {
  let rating = 0;
  console.log("Calculating wave quality rating for slot:", slot);
  // Wave height scoring (optimal surf range)
  const waveHeight = Number(slot.waveHeight) || 0;
  if (waveHeight >= 1 && waveHeight <= 8) {
    if (waveHeight >= 2 && waveHeight <= 6) rating += 2; // ideal range
    else rating += 1; // decent range
  }

  // Swell period scoring (longer periods are better for surf quality)
  const swellPeriod = Number(slot?.period) || 0;

  if (swellPeriod >= 6) rating += 1;
  if (swellPeriod >= 10) rating += 1;
  if (swellPeriod >= 14) rating += 1;

  // Wind conditions scoring
  const windDirection = Number(slot?.windDirection) || 0;
  const windSpeed = Number(slot?.windSpeed) || 0;

  // Wind direction impact
  if (windDirection >= 225 && windDirection <= 315) {
    // Offshore wind - cleans up waves
    rating += 1;
    if (windSpeed >= 5 && windSpeed <= 15) rating += 1; // ideal offshore wind speed
  } else if (windDirection >= 45 && windDirection <= 135) {
    // Onshore wind - messy conditions
    rating -= 1;
    if (windSpeed > 20) rating -= 1; // very messy
  }
  // Cross-shore wind is neutral (no bonus/penalty)
  console.log("Wave quality rating calculation:", {
    waveHeight,
    swellPeriod,
    windDirection,
    windSpeed,
    initialRating: rating,
  });
  return Math.max(1, Math.min(5, rating));
};
