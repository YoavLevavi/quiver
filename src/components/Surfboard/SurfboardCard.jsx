/**
 * SurfboardCard component displays a summary card for a surfboard listing, including image, model, price, size, volume, condition, seller type, description, upload date, and seller information.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.surfboardId - Unique identifier for the surfboard.
 * @param {string} props.mainImage - URL of the surfboard's main image.
 * @param {string} props.model - Model name of the surfboard.
 * @param {boolean} props.isPrivate - Indicates if the seller is a private individual.
 * @param {number} props.price - Price of the surfboard.
 * @param {number|string} props.size - Size of the surfboard (in feet).
 * @param {number|string} props.volume - Volume of the surfboard (in liters).
 * @param {Date|string|number} props.uploadDate - Date when the surfboard was uploaded.
 * @param {string} props.condition - Condition of the surfboard.
 * @param {Object} props.seller - Firestore document reference for the seller.
 * @param {string} props.description - Description of the surfboard.
 * @param {string} props.brand - Brand of the surfboard.
 * @param {function} props.onDelete - Callback function to handle surfboard deletion.
 * @param {string} props.currentUserId - ID of the current user (for determining ownership).
 * @returns {JSX.Element} The rendered surfboard card component.
 */
import React, { useEffect, useState } from "react";
import { Heart, Trash2 } from "lucide-react";
import { getDoc } from "firebase/firestore";
import { formatDate, formatPrice } from "../../utils/format";
import Title2 from "../Text/Title2";
import TextLarge from "../Text/TextLarge";
import TextBody from "../Text/TextBody";
import TextSmall from "../Text/TextSmall";
import { Link } from "react-router";
import SurfboardSellerTypeBadge from "./SurfboardSellerTypeBadge";
import SurfboardConditionBadge from "./SurfboardConditionBadge";
import SubTitle1 from "../Text/SubTitle1";

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
  onDelete,
  currentUserId,
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

  // Check if the current user is the owner
  const isOwner = sellerData && sellerData.uid === currentUserId;

  return (
    <Link to={`/surfboards/${surfboardId}`} className="no-underline">
      <div className="card bg-base-100 shadow-sm max-w-xs relative">
        {/* Show delete button only if user is the owner */}
        {onDelete && isOwner && (
          <>
            <button
              type="button"
              className="absolute btn btn-circle top-2 right-2  hover:bg-red-400 z-10"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(`delete_modal_${surfboardId}`)
                  .showModal();
              }}
              aria-label="מחק גלשן"
            >
              <Trash2 size={18} />
            </button>
            {/* Delete confirmation modal */}
            <dialog id={`delete_modal_${surfboardId}`} className="modal">
              <div
                className="modal-box"
                onClick={(e) => e.stopPropagation()} // Prevent click bubbling to Link
              >
                <SubTitle1 bold={true} className="mb-4">
                  מחיקת גלשן
                </SubTitle1>
                <TextBody>האם אתה בטוח שברצונך למחוק את הגלשן?</TextBody>
                <div className="modal-action">
                  <form method="dialog" className="flex gap-2">
                    <button className="btn" type="submit">
                      ביטול
                    </button>
                    <button
                      className="btn btn-error"
                      type="button"
                      onClick={() => {
                        onDelete();
                        document
                          .getElementById(`delete_modal_${surfboardId}`)
                          .close();
                      }}
                    >
                      מחק
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
          </>
        )}
        {/* className="relative w-full aspect-[9/16] overflow-hidden bg-gray-100" */}

        <figure
          className="rounded-t-lg w-full aspect-[9/20] overflow-hidden bg-gray-100 flex items-center justify-center"
          style={{ height: "340px" }}
        >
          <img
            src={mainImage}
            alt={model}
            className="rounded-t-lg w-full h-full object-cover"
            loading="lazy"
          />
        </figure>

        <div className="card-body">
          <div className="flex flex-wrap gap-4">
            <SurfboardConditionBadge condition={condition} />
            <SurfboardSellerTypeBadge isPrivate={isPrivate} />
          </div>

          {/* Model and price */}
          <TextLarge className="justify-start card-title text-base xl:text-lg font-bold">
            {size}' • {volume}L • {brand} {model}
          </TextLarge>
          <TextLarge className="text-md font-semibold text-right text-primary">
            {formatPrice(price)}
          </TextLarge>

          {/* Description placeholder */}
          <TextBody className="line-clamp-2">
            {/* TODO: Replace with actual description */}
            {description}
          </TextBody>
          {/* Upload date and seller info */}
          <TextSmall>
            {formatDate(uploadDate)} •{" "}
            {sellerData
              ? (
                  (`${sellerData.first_name ?? ""} ${sellerData.last_name ?? ""}`.trim() ||
                  sellerData.displayName ||
                  "אנונימי")
                )
              : "אנונימי"}
          </TextSmall>
        </div>
      </div>
    </Link>
  );
}

export default SurfboardCard;
