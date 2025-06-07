import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import clsx from "clsx";
import { getDoc } from "firebase/firestore";
import { formatDate, formatPrice } from "../../utils/format";
import { getConditionLabel } from "../../utils/surfboardHelpers";
import Title2 from "../Text/Title2";
import TextLarge from "../Text/TextLarge";
import TextBody from "../Text/TextBody";
import TextSmall from "../Text/TextSmall";
import { Link } from "react-router";
/**
 * SurfboardCard displays information about a surfboard.
 * @param {Object} props
 * @param {string} props.mainImage - URL of the surfboard's main image.
 * @param {string} props.model - Model name of the surfboard.
 * @param {boolean} props.isPrivate - True if seller is private, false if shop.
 * @param {string|number} props.price - Price of the surfboard.
 * @param {string} props.size - Size of the surfboard.
 * @param {string} props.volume - Volume of the surfboard.
 * @param {Timestamp} props.uploadDate - Firestore Timestamp of posting.
 * @param {string} props.condition - Condition ("new", "liked new", "used").
 * @param {DocumentReference} props.seller - Firestore reference to seller.
 * @param {string} props.description - Description of the surfboard.
 */
function SurfboardCard({
  surfboardId,
  mainImage,
  model,
  isPrivate,
  price,
  size,
  volume,
  uploadDate,
  condition,
  seller,
  description,
  brand,
}) {
  const [sellerData, setSellerData] = useState(null);

  // Fetch seller data from Firestore when seller reference changes
  useEffect(() => {
    if (!seller) return;
    const fetchSeller = async () => {
      const sellerSnap = await getDoc(seller);
      if (sellerSnap.exists()) {
        setSellerData(sellerSnap.data());
      }
    };
    fetchSeller();
  }, [seller]);

  return (
    <Link to={`/surfboards/${surfboardId}`} className="no-underline">
      <div className="card bg-base-100 shadow-sm max-w-xs">
        {/* Surfboard main image */}
        <figure className="relative w-full aspect-[9/16] overflow-hidden bg-gray-100">
          <img
            src={mainImage}
            alt={model}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </figure>

        <div className="card-body">
          <div className="flex flex-wrap gap-4">
            {/* Condition badge */}
            <span
              className={clsx("badge p-3", {
                "badge-success": condition === "new",
                "badge-warning": condition === "liked new",
                "badge-neutral": condition === "used",
              })}
            >
              {getConditionLabel(condition)}
            </span>
            {/* Seller type badge */}
            <span
              className={clsx("badge p-3", {
                "badge-primary": isPrivate === true,
                "badge-secondary": isPrivate === false,
              })}
            >
              {isPrivate ? "פרטי" : "חנות גלישה"}
            </span>
          </div>

          {/* Model and price */}
          <TextLarge className="justify-start card-title text-base xl:text-lg font-bold">
            {size}' • {volume}L • {brand} {model}
          </TextLarge>
          <TextLarge className="text-md font-semibold text-right text-primary">
            {formatPrice(price)}
          </TextLarge>

          {/* Description placeholder */}
          <TextBody className="line-clamp-3">
            {/* TODO: Replace with actual description */}
            {description}
          </TextBody>
          {/* Upload date and seller info */}
          <TextSmall>
            {formatDate(uploadDate)} •{" "}
            {sellerData
              ? `${sellerData.first_name ?? ""} ${
                  sellerData.last_name ?? ""
                }`.trim()
              : "אנונימי"}
          </TextSmall>
        </div>
      </div>
    </Link>
  );
}

export default SurfboardCard;
