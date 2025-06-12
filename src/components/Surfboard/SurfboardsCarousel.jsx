/**
 * SurfboardsCarousel component fetches and displays a grid of surfboard cards.
 *
 * - Fetches a list of surfboards (limited to 12) from the store on mount.
 * - Shows a loading indicator while data is being fetched.
 * - Renders a responsive grid of SurfboardCard components for each surfboard.
 *
 * @component
 * @returns {JSX.Element} The rendered carousel of surfboard cards or a loading indicator.
 */
import React, { useEffect } from "react";
import useSurfboardStore from "../../store/useSurfboardStore";
import SurfboardCard from "./SurfboardCard";
import LoadingIndicator from "../UI/LoadingIndicator";

function SurfboardsCarousel() {
  const { surfboards, loading, fetchSurfboards, deleteSurfboard } =
    useSurfboardStore();

  useEffect(() => {
    fetchSurfboards({ limitTo: 12 });
  }, []);

  return (
    <div className="container flex justify-around items-center">
      {loading ? (
        <LoadingIndicator />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {surfboards.map((surfboard, index) => (
            <SurfboardCard
              key={surfboard.id || index}
              surfboardId={surfboard.id}
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
              onDelete={() => deleteSurfboard(surfboard.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SurfboardsCarousel;
