import React from "react";
import { getConditionLabel } from "../../utils/surfboardHelpers";
import clsx from "clsx";

function SurfboardConditionBadge({ condition }) {
  return (
    <>
      {/* Condition badge   */}
      <span
        className={clsx("badge p-3", {
          "badge-success": condition === "new",
          "badge-warning": condition === "like new", // Fixed typo "liked new" to "like new"
          "badge-neutral": condition === "used",
        })}
      >
        {getConditionLabel(condition)}
      </span>
    </>
  );
}

export default SurfboardConditionBadge;
