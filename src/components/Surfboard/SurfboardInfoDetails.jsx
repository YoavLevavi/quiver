/**
 * Displays detailed information about a surfboard, including brand, model, description, price, and specifications.
 * Also provides a button to contact the seller.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.surfboard - The surfboard object containing details to display.
 * @param {string} [props.surfboard.brand] - The brand of the surfboard.
 * @param {string} [props.surfboard.model] - The model name of the surfboard.
 * @param {string} [props.surfboard.description] - A description of the surfboard.
 * @param {number} [props.surfboard.price] - The price of the surfboard.
 * @param {boolean} [props.surfboard.isPrivate] - True if the seller is private, false if shop.
 * @param {string} [props.surfboard.condition] - Condition of the surfboard.
 * @returns {JSX.Element|null} The rendered surfboard details section, or null if no surfboard is provided.
 */

import React from "react";
import { formatPrice } from "../../utils/format";
import Title2 from "../Text/Title2";
import TextLarge from "../Text/TextLarge";
import Title3 from "../Text/Title3";
import SurfboardSpecs from "./SurfboardSpecs";
import SurfboardConditionBadge from "./SurfboardConditionBadge";
import SurfboardSellerTypeBadge from "./SurfboardSellerTypeBadge";

function SurfboardInfoDetails({ surfboard }) {
  if (!surfboard) return null;
  return (
    <section className="flex flex-col flex-1 h-full">
      <header className="flex flex-col gap-4">
        <Title2>
          {surfboard.brand || "Unknown Brand"} {surfboard.model || "Surfboard"}
        </Title2>
        <div className="flex items-center gap-2">
          <SurfboardConditionBadge condition={surfboard.condition} />
          <SurfboardSellerTypeBadge isPrivate={surfboard.isPrivate} />
        </div>
        {surfboard.description && (
          <TextLarge>{surfboard.description}</TextLarge>
        )}
        <Title3>{formatPrice(surfboard.price)}</Title3>
      </header>
      <div className="divider"></div>
      <div className="my-4 flex-1">
        <SurfboardSpecs surfboard={surfboard} />
      </div>
      <div className="mt-auto">
        <button className="btn btn-lg w-full">שלח הודעה למוכר</button>
      </div>
    </section>
  );
}

export default SurfboardInfoDetails;
