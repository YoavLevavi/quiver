/**
 * SurfboardInfo component displays detailed information about a surfboard, including brand, model, description, price, and specifications.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.surfboard - The surfboard object containing details to display.
 * @param {string} [props.surfboard.brand] - The brand of the surfboard.
 * @param {string} [props.surfboard.model] - The model of the surfboard.
 * @param {string} [props.surfboard.description] - Description of the surfboard.
 * @param {number} [props.surfboard.price] - Price of the surfboard.
 * @param {string|number} [props.surfboard.size] - Size/height of the surfboard.
 * @param {string|number} [props.surfboard.volume] - Volume of the surfboard.
 * @param {string} [props.surfboard.finSystem] - Fin system of the surfboard.
 * @param {string} [props.surfboard.technology] - Technology used in the surfboard.
 * @returns {JSX.Element|null} The rendered surfboard info or null if no surfboard is provided.
 */

/**
 * SurfboardDetailsPage component displays the details page for a specific surfboard, including image gallery, info, and loading skeletons.
 *
 * @component
 * @returns {JSX.Element} The rendered surfboard details page.
 */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useSurfboardStore from "../store/useSurfboardStore";
import NavBar from "../components/NavBar";
import SurfboardImageGallery from "../components/Surfboard/SurfboardImageGallery";
import SurfboardInfoDetails from "../components/Surfboard/SurfboardInfoDetails";
import { ChevronRight } from "lucide-react";

// --- קומפוננטת העמוד הראשית (עם שלד טעינה משופר) ---
const SurfboardDetailsPage = () => {
  const { id } = useParams();
  const { surfboards, loading, fetchSurfboards } = useSurfboardStore();
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  const surfboard = surfboards.find((b) => b.id === id);

  useEffect(() => {
    if ((!surfboards.length || !surfboard) && !loading) {
      fetchSurfboards();
    }
  }, [id, fetchSurfboards, surfboards, surfboard, loading]);

  useEffect(() => {
    setSelectedImageIdx(0);
  }, [id]);

  if (loading && !surfboard) {
    return (
      <>
        <NavBar />
        <div className="container mx-auto max-w-7xl py-12 px-4">
          <div className="flex flex-col md:flex-row gap-12 lg:gap-16 items-start">
            {/* Skeleton for Image Gallery */}
            <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col items-center gap-4">
              <div className="skeleton w-full h-[450px] md:h-[550px] rounded-xl bg-base-300"></div>
              <div className="flex gap-3 mt-2">
                <div className="skeleton w-16 h-16 rounded-lg bg-base-300"></div>
                <div className="skeleton w-16 h-16 rounded-lg bg-base-300"></div>
                <div className="skeleton w-16 h-16 rounded-lg bg-base-300"></div>
              </div>
            </div>
            {/* Skeleton for Details */}
            <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col gap-6 pt-4 md:pt-0">
              <div className="skeleton h-5 w-1/4 mb-1 bg-base-300"></div>
              <div className="skeleton h-12 w-3/4 mb-4 bg-base-300"></div>
              <div className="skeleton h-10 w-1/3 mb-6 bg-base-300"></div>
              <div className="skeleton h-20 w-full mb-6 bg-base-300"></div>
              <div className="skeleton h-px w-full my-4 bg-base-300"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="skeleton h-20 bg-base-300 rounded-lg"></div>
                <div className="skeleton h-20 bg-base-300 rounded-lg"></div>
              </div>
              <div className="skeleton h-14 w-full mt-auto bg-base-300 rounded-lg"></div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!surfboard) {
    return (
      <>
        <NavBar />
        <div className="text-center py-20 text-xl">המודעה לא נמצאה.</div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="container py-6">
        <button className="btn" onClick={() => window.history.back()}>
          <ChevronRight />
          חזור
        </button>
      </div>

      <div className="flex flex-col md:flex-row container py-6  gap-12 h-fit">
        <SurfboardImageGallery
          images={surfboard.images}
          altText={`${surfboard.brand || "Unknown"} ${
            surfboard.model || "Surfboard"
          }`}
          selectedImageIdx={selectedImageIdx}
          onSelectImage={setSelectedImageIdx}
        />
        <SurfboardInfoDetails surfboard={surfboard} />
      </div>
    </>
  );
};

export default SurfboardDetailsPage;
