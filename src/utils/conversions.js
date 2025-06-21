/**
 * Converts meters to feet.
 * @param {number} meters
 * @returns {number}
 */
export const toFeet = (meters) => {
  if (typeof meters !== "number") return null;
  return meters * 3.28084;
};

/**
 * Converts feet to meters.
 * @param {number} feet
 * @returns {number}
 */
export const toMeters = (feet) => {
  if (typeof feet !== "number") return null;
  return feet / 3.28084;
};

/**
 * Converts meters per second to kilometers per hour.
 * @param {number} ms
 * @returns {number}
 */
export const toKmh = (ms) => {
  if (typeof ms !== "number") return null;
  return ms * 3.6;
};

/**
 * Converts the given wind speed to kilometers per hour (kph) and rounds it to the nearest integer.
 * If the input is null, undefined, or not a number, returns an em dash ("—").
 * Assumes the input wind speed is already in kph (as provided by Open-Meteo).
 *
 * @param {number|string|null|undefined} windSpeed - The wind speed value to convert and round.
 * @returns {number|string} The rounded wind speed in kph, or "—" if input is invalid.
 */
export const getWindSpeedKph = (windSpeed) => {
  if (windSpeed === null || windSpeed === undefined || isNaN(Number(windSpeed)))
    return "—";
  return Math.round(Number(windSpeed)); // Already in kph from Open-Meteo
};

export function getWindDirectionRelativeToCoast(
  windDirectionDeg,
  coastlineDirectionDeg,
  spotWindShelter
) {
  const landDirectionDeg = (coastlineDirectionDeg + 180) % 360;
  let angleFromLand = (windDirectionDeg - landDirectionDeg + 360) % 360;

  const cardinalToDeg = {
    N: 0,
    NE: 45,
    E: 90,
    SE: 135,
    S: 180,
    SW: 225,
    W: 270,
    NW: 315,
  };

  if (spotWindShelter && Object.keys(spotWindShelter).length > 0) {
    for (const shelteredDirKey in spotWindShelter) {
      const shelterType = spotWindShelter[shelteredDirKey];
      const shelteredDirectionDeg =
        cardinalToDeg[shelteredDirKey.toUpperCase()];
      if (shelteredDirectionDeg !== undefined) {
        let angleDiff = Math.abs(shelteredDirectionDeg - windDirectionDeg);
        angleDiff = Math.min(angleDiff, 360 - angleDiff);

        if (shelterType === "full" && angleDiff < 45) {
          return "Offshore";
        }
      }
    }
  }

  if (
    (angleFromLand >= 0 && angleFromLand <= 45) ||
    (angleFromLand > 315 && angleFromLand <= 360)
  ) {
    return "Offshore";
  } else if (angleFromLand > 45 && angleFromLand <= 90) {
    return "Cross-Offshore";
  } else if (angleFromLand > 90 && angleFromLand < 180) {
    return "Cross-Shore";
  } else if (angleFromLand >= 180 && angleFromLand <= 270) {
    return "Onshore";
  } else if (angleFromLand > 270 && angleFromLand < 315) {
    return "Cross-Onshore";
  } else {
    return "Cross-Shore";
  }
}

export function getWindStrengthCategory(windSpeedKmh) {
  if (windSpeedKmh <= 5) {
    return "0-5 km/h";
  } else if (windSpeedKmh <= 15) {
    return "6-15 km/h";
  } else if (windSpeedKmh <= 25) {
    return "16-25 km/h";
  } else {
    return "> 25 km/h";
  }
}

/**
 * Calculates the wave quality rating for a given surf spot based on swell, wind, and tide conditions.
 *
 * @param {string} spotName - The name of the surf spot.
 * @param {number} primarySwellHeightM - The height of the primary swell in meters.
 * @param {number} primarySwellPeriodS - The period of the primary swell in seconds.
 * @param {number} primarySwellDirectionDeg - The direction of the primary swell in degrees.
 * @param {number} windSpeedKmh - The wind speed in kilometers per hour.
 * @param {number} windDirectionDeg - The wind direction in degrees.
 * @param {string} [tideState="moving"] - The state of the tide ("moving" or "slack").
 * @returns {Object} An object containing the calculated wave quality rating, including:
 *   - {string} spot_name: The name of the surf spot.
 *   - {number} final_score: The final calculated score (0-100).
 *   - {string} verbal_rating: The verbal rating (e.g., "FLAT", "GOOD").
 *   - {string} color_code: The color code representing the rating.
 *   - {string} description: A description of the rating.
 *   - {Object} details: Detailed breakdown of the calculation, including input parameters and intermediate scores.
 * @throws {Error} If the spot is not found in the database.
 */
export function calculateWaveQualityRating(
  spotName,
  primarySwellHeightM,
  primarySwellPeriodS,
  primarySwellDirectionDeg,
  windSpeedKmh,
  windDirectionDeg,
  tideState = "moving"
) {
  const spotInfo = SPOT_DATABASE[spotName];
  if (!spotInfo) {
    throw new Error(`Spot '${spotName}' not found in the database.`);
  }

  const [optimalSwellMin, optimalSwellMax] = spotInfo.optimal_swell_directions;
  if (
    !(
      primarySwellDirectionDeg >= optimalSwellMin &&
      primarySwellDirectionDeg <= optimalSwellMax
    )
  ) {
    return {
      spot_name: spotName,
      final_score: 0,
      verbal_rating: "FLAT",
      color_code: "Gray",
      description: `No surfable waves. Swell direction ${primarySwellDirectionDeg}° is outside optimal range ${optimalSwellMin}°-${optimalSwellMax}° for ${spotName}.`,
      details: {
        swell_direction_check: "FAILED",
        reason: `Swell direction ${primarySwellDirectionDeg}° is outside optimal range ${optimalSwellMin}°-${optimalSwellMax}° for ${spotName}.`,
        primary_swell_height_m: primarySwellHeightM,
        primary_swell_period_s: primarySwellPeriodS,
        primary_swell_direction_deg: primarySwellDirectionDeg,
        wind_speed_kmh: windSpeedKmh,
        wind_direction_deg: windDirectionDeg,
        tide_state: tideState,
      },
    };
  }

  let sps;
  if (primarySwellPeriodS < 5) {
    sps = 0;
  } else if (primarySwellPeriodS === 6) {
    sps = 20;
  } else if (primarySwellPeriodS === 7) {
    sps = 40;
  } else if (primarySwellPeriodS === 8) {
    sps = 60;
  } else if (primarySwellPeriodS === 9) {
    sps = 80;
  } else {
    sps = 100;
  }

  let shs;
  if (primarySwellHeightM < 0.4) {
    shs = 0;
  } else {
    shs = Math.min((primarySwellHeightM / 2.5) * 100, 100);
  }

  const pss = sps * 0.7 + shs * 0.3;

  const coastlineDirection = spotInfo.coastline_direction;
  const spotWindShelter = spotInfo.wind_shelter;

  const relativeWindDirection = getWindDirectionRelativeToCoast(
    windDirectionDeg,
    coastlineDirection,
    spotWindShelter
  );
  const windStrengthCategory = getWindStrengthCategory(windSpeedKmh);

  let windMultiplier;
  const windTableForDirection = WIND_MULTIPLIER_TABLE[relativeWindDirection];

  if (relativeWindDirection === "Cross-Shore" && windSpeedKmh > 0) {
    windMultiplier = windTableForDirection["> 0 km/h"] || 0.0;
  } else {
    windMultiplier = windTableForDirection[windStrengthCategory] || 0.0;
  }

  const was = pss * windMultiplier;

  let tideMultiplier = 1.0;
  if (tideState === "slack") {
    tideMultiplier = 0.95;
  } else if (tideState === "moving") {
    tideMultiplier = 1.05;
  }

  const finalScore =
    Math.round(Math.min(Math.max(was * tideMultiplier, 0), 100) * 100) / 100;

  const verbalRatingInfo = RATING_SCALE.find(
    (item) =>
      finalScore >= item.score_range[0] && finalScore <= item.score_range[1]
  );

  return {
    spot_name: spotName,
    final_score: finalScore,
    verbal_rating: verbalRatingInfo
      ? verbalRatingInfo.verbal_rating
      : RATING_SCALE[0].verbal_rating,
    color_code: verbalRatingInfo
      ? verbalRatingInfo.color_code
      : RATING_SCALE[0].color_code,
    description: verbalRatingInfo
      ? verbalRatingInfo.description
      : RATING_SCALE[0].description,
    details: {
      primary_swell_height_m: primarySwellHeightM,
      primary_swell_period_s: primarySwellPeriodS,
      primary_swell_direction_deg: primarySwellDirectionDeg,
      wind_speed_kmh: windSpeedKmh,
      wind_direction_deg: windDirectionDeg,
      tide_state: tideState,
      swell_period_score: sps,
      swell_height_score: shs,
      potential_swell_score: Math.round(pss * 100) / 100,
      relative_wind_direction: relativeWindDirection,
      wind_strength_category: windStrengthCategory,
      wind_multiplier: windMultiplier,
      wind_adjusted_score: Math.round(was * 100) / 100,
      tide_multiplier: tideMultiplier,
    },
  };
}

export const convertTemp = (temp, tempUnit) => {
  if (tempUnit === "F") {
    return ((temp * 9) / 5 + 32).toFixed(1);
  }
  return temp?.toFixed(1);
};

export const convertHeight = (height, unit) => {
  if (unit === "m") {
    return (height / 3.281).toFixed(1);
  }
  return height?.toFixed(1);
};
