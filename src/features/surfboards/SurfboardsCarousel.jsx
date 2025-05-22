import React from "react";
import SurfboardCard from "./SurfboardCard";

function SurfboardsCarousel() {
  return (
    <div className="flex flex-row gap-6 flex-wrap justify-between">
      {[1, 2, 3, 4, 5, 6].map((item, index) => (
        <div key={index}>
          <SurfboardCard
            image={
              "https://drivergear.vw.com/store/20200424693/assets/items/largeimages/DRGD7180.jpg"
            }
            isPrivate={index % 2 === 0}
            needsRepair={index % 3 === 0}
            title={`Surfboard Model ${item}`}
            price={`$${(item * 1000).toLocaleString()}`}
            dimensions="24 x 234 x 234"
            location="Ashkelon"
            seller="Anonymous Seller"
            date="May 13, 2025"
          />
        </div>
      ))}
    </div>
  );
}

export default SurfboardsCarousel;
