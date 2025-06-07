/**
 * SpotSelector component renders a styled dropdown for selecting a surf spot.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.selected - The currently selected spot object.
 * @param {Function} props.onChange - Callback function when a new spot is selected.
 * @returns {JSX.Element} SpotSelector UI
 */

import React from "react";
import { SPOTS } from "../../utils/surfSpots";

function SpotSelector({ selected, onChange }) {
  return (
    <div className="w-full max-w-md mx-auto text-right">
      <select
        id="spot-selector"
        className="select select-bordered w-full bg-base-100 border-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
        value={selected.name}
        onChange={(e) => {
          const spot = SPOTS.find((s) => s.name === e.target.value);
          if (spot) onChange(spot);
        }}
      >
        {SPOTS.map((spot) => (
          <option key={spot.name} value={spot.name}>
            {spot.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SpotSelector;
