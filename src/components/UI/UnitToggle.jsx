import React from "react";
import PropTypes from "prop-types";

function UnitToggle({ unit, onChange }) {
  return (
    <div className="mb-4 flex gap-4 justify-end">
      <button
        className={`btn btn-sm ${unit === "m" ? "btn-primary" : "btn-outline"}`}
        onClick={() => onChange("m")}
      >
        מטר
      </button>
      <button
        className={`btn btn-sm ${
          unit === "ft" ? "btn-primary" : "btn-outline"
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
