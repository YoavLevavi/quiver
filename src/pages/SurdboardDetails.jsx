import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useSurfboardStore from "../store/useSurfboardStore";
import Title2 from "../components/Text/Title2";
import TextLarge from "../components/Text/TextLarge";
import TextBody from "../components/Text/TextBody";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import { formatPrice } from "../utils/format";
import { getConditionLabel } from "../utils/surfboardHelpers";
import NavBar from "../components/NavBar";

const SurfboardDetails = () => {
  const { id } = useParams();
  const { surfboards, loading, fetchSurfboards } = useSurfboardStore();
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  // Find surfboard by ID
  const surfboard = surfboards.find((b) => b.id === id);

  // Fetch if needed
  useEffect(() => {
    if (!surfboards.length && !loading) {
      fetchSurfboards();
    }
    // eslint-disable-next-line
  }, [id, fetchSurfboards, surfboards.length, loading]);

  // Reset selected image if board or ID changes
  useEffect(() => {
    setSelectedImageIdx(0);
  }, [id, surfboard]);

  if (loading) return <LoadingIndicator />;
  if (!surfboard)
    return <div className="text-center py-8 text-lg">Surfboard not found.</div>;

  const images =
    surfboard.images && surfboard.images.length > 0
      ? surfboard.images
      : ["https://placehold.co/400x600?text=No+Image"];

  return (
    <>
      <NavBar />
      <div className="container mx-auto py-8 flex flex-col md:flex-row gap-8">
        {/* Images */}
        <div className="flex-1 flex flex-col gap-4 items-center">
          <img
            src={images[selectedImageIdx]}
            alt={
              surfboard.model
                ? `${surfboard.brand} ${surfboard.model} main image`
                : "Surfboard"
            }
            className="rounded-xl shadow-lg max-w-xs w-full transition-all"
          />
          {/* Thumbnails */}
          <div className="flex gap-2 mt-2">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={
                  surfboard.model
                    ? `${surfboard.brand} ${surfboard.model} thumbnail ${
                        idx + 1
                      }`
                    : `Surfboard thumbnail ${idx + 1}`
                }
                className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${
                  idx === selectedImageIdx
                    ? "border-primary shadow"
                    : "border-gray-200"
                }`}
                onClick={() => setSelectedImageIdx(idx)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    setSelectedImageIdx(idx);
                }}
                aria-label={`Show image ${idx + 1}`}
              />
            ))}
          </div>
        </div>
        {/* Details */}
        <div className="flex-1 flex flex-col gap-4">
          <Title2>
            {surfboard.brand || "Unknown brand"} {surfboard.model || ""}
          </Title2>
          <TextLarge bold>{formatPrice(surfboard.price)}</TextLarge>
          <div className="flex gap-4 flex-wrap">
            <span className="badge badge-neutral">
              {getConditionLabel(surfboard.condition)}
            </span>
            {surfboard.size && (
              <span className="badge badge-outline">{surfboard.size}'</span>
            )}
            {surfboard.volume && (
              <span className="badge badge-outline">{surfboard.volume}L</span>
            )}
          </div>
          {surfboard.description && (
            <TextBody>{surfboard.description}</TextBody>
          )}
          <div className="flex gap-4 flex-wrap">
            {surfboard.technology && (
              <span className="badge">{surfboard.technology}</span>
            )}
            {surfboard.finSystem && (
              <span className="badge">{surfboard.finSystem}</span>
            )}
          </div>
          {surfboard.location && (
            <div>
              <TextBody>
                <strong>מיקום:</strong> {surfboard.location}
              </TextBody>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SurfboardDetails;
