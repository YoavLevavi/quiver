import React from "react";
import PropTypes from "prop-types";

function UnitToggle({ unit, onChange }) {
  return (
    <div className="flex items-center gap-4">
      <button
        className={`px-4 py-2 rounded-full text-sm transition ${
          unit === "m"
            ? "bg-black text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
        onClick={() => onChange("m")}
      >
        מטרים
      </button>
      <button
        className={`px-4 py-2 rounded-full text-sm transition ${
          unit === "ft"
            ? "bg-black text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
        onClick={() => onChange("ft")}
      >
        פיט
      </button>
    </div>
  );
}

UnitToggle.propTypes = {
  unit: PropTypes.oneOf(["m", "ft"]).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default UnitToggle;
