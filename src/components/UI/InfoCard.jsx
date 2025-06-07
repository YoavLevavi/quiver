import React from "react";
import clsx from "clsx";
import Title2 from "../Text/Title2";
import SubTitle1 from "../Text/SubTitle1";

/**
 * InfoCard displays a simple metric block with an icon, label, and value.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.icon - The icon to display at the top.
 * @param {string} props.label - The label/title of the card.
 * @param {React.ReactNode} props.value - The main value (e.g., "24.3°C").
 * @param {string} [props.className] - Optional additional classes.
 */
function InfoCard({ icon, label, value, className }) {
  return (
    <div
      className={clsx(
        "flex flex-col justify-between bg-base-200 rounded-2xl p-6",
        className
      )}
    >
      {icon && <div className="mb-2 text-2xl">{icon}</div>}
      <SubTitle1 className="text-muted">{label}</SubTitle1>
      <Title2>{value}</Title2>
    </div>
  );
}

export default InfoCard;
