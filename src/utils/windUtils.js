/**
 * Returns a background color class based on wind speed.
 *
 * @param {number} speed - The wind speed in knots.
 * @returns {string} The corresponding Tailwind CSS background color class:
 *   - "bg-green-300" for light wind (speed < 18)
 *   - "bg-orange-300" for moderate wind (18 <= speed < 25)
 *   - "bg-red-300" for strong wind (speed >= 25)
 */
export const getWindBg = (speed) => {
  if (speed < 18) return "bg-green-300"; // light wind
  if (speed < 25) return "bg-orange-300"; // moderate wind
  return "bg-red-300"; // strong wind
};
