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

import React, { useEffect, useState, useCallback } from "react";
import { formatPrice } from "../../utils/format";
import Title2 from "../Text/Title2";
import TextLarge from "../Text/TextLarge";
import Title3 from "../Text/Title3";
import SurfboardSpecs from "./SurfboardSpecs";
import SurfboardConditionBadge from "./SurfboardConditionBadge";
import SurfboardSellerTypeBadge from "./SurfboardSellerTypeBadge";
import DOMPurify from "dompurify";
import { getDoc } from "firebase/firestore";
import { Mail, MessageCircle } from "lucide-react";

function SurfboardInfoDetails({ surfboard }) {
  const [sellerDetails, setSellerDetails] = useState({
    phoneNumber: null,
    fullName: null,
    location: null,
    email: null,
  });

  const fetchSellerDetails = useCallback(async () => {
    console.log("Fetching seller details...");
    if (surfboard?.seller) {
      console.log("Surfboard seller ref:", surfboard.seller);
      try {
        const sellerDoc = await getDoc(surfboard.seller);
        if (sellerDoc.exists()) {
          const sellerData = sellerDoc.data();
          console.log("Seller data:", sellerData);
          setSellerDetails({
            phoneNumber: sellerData.phone_number || null,
            fullName:
              `${sellerData.first_name || ""} ${
                sellerData.last_name || ""
              }`.trim() || null,
            location: sellerData.location || null,
            email: sellerData.email || null,
          });
        } else {
          console.log("No seller document found.");
        }
      } catch (error) {
        console.error("Error fetching seller document:", error);
      }
    } else {
      console.log("No seller ref found in surfboard.");
    }
  }, [surfboard?.seller]);

  useEffect(() => {
    fetchSellerDetails();
  }, [fetchSellerDetails]);

  if (!surfboard) return null;

  // Sanitize user-provided content
  const sanitizedDescription = surfboard.description
    ? DOMPurify.sanitize(surfboard.description)
    : "";
  const sanitizedBrand = surfboard.brand
    ? DOMPurify.sanitize(surfboard.brand)
    : "Unknown Brand";
  const sanitizedModel = surfboard.model
    ? DOMPurify.sanitize(surfboard.model)
    : "Surfboard";

  const sanitizedSellerDetails = {
    phoneNumber: sellerDetails.phoneNumber
      ? DOMPurify.sanitize(sellerDetails.phoneNumber)
      : null,
    fullName: sellerDetails.fullName
      ? DOMPurify.sanitize(sellerDetails.fullName)
      : "Unknown Seller",
    location: sellerDetails.location
      ? DOMPurify.sanitize(sellerDetails.location)
      : "Unknown Location",
    email: sellerDetails.email ? DOMPurify.sanitize(sellerDetails.email) : null,
  };

  const whatsappLink = sanitizedSellerDetails.phoneNumber
    ? `https://wa.me/+972${sanitizedSellerDetails.phoneNumber}?text=Hi,%20I%20am%20interested%20in%20your%20surfboard%20listing!`
    : null;

  return (
    <section className="flex flex-col flex-1 h-full">
      <header className="flex flex-col gap-4">
        <Title2>
          {sanitizedBrand} {sanitizedModel}
        </Title2>
        <div className="flex items-center gap-2">
          <SurfboardConditionBadge condition={surfboard.condition} />
          <SurfboardSellerTypeBadge isPrivate={surfboard.isPrivate} />
        </div>
        {sanitizedDescription && <TextLarge>{sanitizedDescription}</TextLarge>}
        <Title3>{formatPrice(surfboard.price)}</Title3>
      </header>
      <div className="divider"></div>
      <div className="my-4 flex-1">
        <SurfboardSpecs surfboard={surfboard} />
      </div>
      <div className="mt-auto flex flex-col gap-2">
        {/* <button className="btn btn-lg w-full">שלח הודעה למוכר</button> */}
        {whatsappLink ? (
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lg w-full bg-green-500 text-white hover:bg-green-600 flex items-center justify-center gap-2"
          >
            <MessageCircle />
            צור קשר עם המוכר בוואטסאפ
          </a>
        ) : (
          <button
            className="btn btn-lg w-full bg-gray-400 text-white cursor-not-allowed"
            disabled
          >
            ווטסאפ לא זמין
          </button>
        )}
        {sanitizedSellerDetails.email && (
          <a
            href={`mailto:${sanitizedSellerDetails.email}`}
            className="btn btn-lg w-full bg-blue-500 text-white hover:bg-blue-600 flex items-center justify-center gap-2"
          >
            <Mail />
            צרו קשר עם המוכר/ת באימייל
          </a>
        )}
      </div>
    </section>
  );
}

export default SurfboardInfoDetails;
