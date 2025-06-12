/**
 * InfoCardSurfboard component displays an information card with an optional icon, label, and value.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {React.ReactNode} [props.icon] - Optional icon to display at the top of the card.
 * @param {string} props.label - The label text to display below the icon.
 * @param {string|number|React.ReactNode} props.value - The value to display prominently in the card.
 * @param {string} [props.className] - Additional CSS classes to apply to the card container.
 * @returns {JSX.Element} The rendered InfoCardSurfboard component.
 */
import React from "react";
import clsx from "clsx";

import TextBody from "../Text/TextBody";
import Title3 from "../Text/Title3";

function InfoCardSurfboard({ icon, label, value, className }) {
  return (
    <div
      className={clsx(
        "flex flex-col justify-between bg-base-200 rounded-2xl p-6",
        className
      )}
    >
      {icon && <div className="mb-2 text-2xl">{icon}</div>}
      <TextBody className="text-muted">{label}</TextBody>
      <Title3>{value}</Title3>
    </div>
  );
}

export default InfoCardSurfboard;
