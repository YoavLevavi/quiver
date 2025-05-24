import React, { useEffect } from "react";
import useSurfboardStore from "../../store/useSurfboardStore";
import SurfboardCard from "./SurfboardCard";

/**
 * Displays a carousel/grid of surfboards fetched from the store.
 *
 * Fetches surfboards on mount and displays them in a responsive grid layout.
 * Shows a loading indicator while data is being fetched.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered surfboards carousel component.
 */
function SurfboardsCarousel() {
  const { surfboards, loading, fetchSurfboards } = useSurfboardStore();

  useEffect(() => {
    fetchSurfboards({ limitTo: 12 });
  }, []);

  return (
    <div className="container min-h-[300px] flex justify-center items-center">
      {loading ? (
        <span className="loading loading-dots loading-xl text-info"></span>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {surfboards.map((surfboard, index) => (
            <SurfboardCard
              key={surfboard.id || index}
              model={surfboard.model}
              mainImage={surfboard.images[0]}
              isPrivate={surfboard.isPrivate}
              price={surfboard.price}
              size={surfboard.size}
              volume={surfboard.volume}
              uploadDate={surfboard.upload_date}
              condition={surfboard.condition}
              seller={surfboard.seller}
              description={surfboard.description}
              brand={surfboard.brand}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SurfboardsCarousel;
