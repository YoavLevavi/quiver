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
 * Converts meters per second to kilometers per hour.
 * @param {number} ms
 * @returns {number}
 */
export const toKmh = (ms) => {
  if (typeof ms !== "number") return null;
  return ms * 3.6;
};
