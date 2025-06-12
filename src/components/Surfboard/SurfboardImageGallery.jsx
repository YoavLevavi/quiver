import React from "react";

const PLACEHOLDER_IMAGE = "https://placehold.co/600x800?text=No+Image";

function SurfboardImageGallery({
  images,
  altText,
  selectedImageIdx,
  onSelectImage,
}) {
  const displayImages =
    images && images.length > 0 ? images : [PLACEHOLDER_IMAGE];
  return (
    <div className="w-full flex flex-col flex-1 items-stretch">
      {/* Main Image */}
      <div className="w-full bg-base-200 rounded-xl shadow-lg overflow-hidden bg-cover">
        <img
          src={displayImages[selectedImageIdx]}
          alt={altText}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
        />
      </div>
      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className="flex gap-3 mt-2 flex-wrap justify-center">
          {displayImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => onSelectImage(idx)}
              // Optional: Add tabIndex and aria-selected for accessibility
              tabIndex={0}
              aria-selected={idx === selectedImageIdx}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onSelectImage(idx);
              }}
              className={`w-16 h-16 rounded-lg overflow-hidden cursor-pointer ring-offset-base-100 ring-offset-2 transition-all duration-300 ${
                idx === selectedImageIdx
                  ? "ring-2 ring-primary scale-105"
                  : "ring-1 ring-base-300 hover:ring-primary/50"
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1} for ${altText}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SurfboardImageGallery;
