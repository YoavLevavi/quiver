/**
 * Renders a badge indicating the type of seller (private or shop).
 *
 * @param {Object} props - Component properties.
 * @param {boolean} props.isPrivate - True if the seller is private, false if it's a shop.
 * @returns {JSX.Element} The rendered badge component.
 */

import clsx from "clsx";
import React from "react";

function SurfboardSellerTypeBadge({ isPrivate }) {
  return (
    <>
      {/* Seller type badge */}
      <span
        className={clsx("badge p-3", {
          "badge-primary": isPrivate === true,
          "badge-secondary": isPrivate === false,
        })}
      >
        {isPrivate ? "פרטי" : "חנות גלישה"}
      </span>
    </>
  );
}

export default SurfboardSellerTypeBadge;
