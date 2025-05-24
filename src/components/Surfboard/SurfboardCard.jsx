import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import clsx from "clsx";
import { getDoc } from "firebase/firestore";
import { formatDate, formatPrice } from "../../utils/format";
import { getConditionLabel } from "../../utils/surfboardHelpers";
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
    <div className="card bg-base-100 shadow-sm">
      {/* Surfboard main image */}
      <figure>
        <img
          src={mainImage}
          alt={model}
          className="w-full object-cover"
          loading="lazy"
        />
      </figure>
      <div className="card-body">
        <div className="flex flex-row gap-4">
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
        <h2
          dir="ltr"
          className="justify-end card-title text-base xl:text-lg font-bold"
        >
          {size}' • {volume}L • {brand} {model}
        </h2>
        <p className="text-md font-semibold text-right text-primary">
          {formatPrice(price)}
        </p>

        {/* Description placeholder */}
        <p className="text-gray-600 line-clamp-3">
          {/* TODO: Replace with actual description */}
          {description}
        </p>
        {/* Upload date and seller info */}
        <p className="text-sm">
          {formatDate(uploadDate)} •{" "}
          {sellerData
            ? `${sellerData.first_name ?? ""} ${
                sellerData.last_name ?? ""
              }`.trim()
            : "אנונימי"}
        </p>
      </div>
    </div>
  );
}

export default SurfboardCard;
