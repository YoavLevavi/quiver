import React from "react";
import { Heart } from "lucide-react";
function SurfboardCard({
  image,
  isPrivate,
  needsRepair,
  title,
  price,
  dimensions,
  location,
  seller,
  date,
}) {
  return (
    <div class="card bg-base-100 w-100 shadow-sm">
      <figure>
        <img src={image} alt="Shoes"/>
      </figure>
      <div class="card-body">
        <h2 class="card-title">Card Title</h2>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
    // <div className=" border bg-white shadow p-2 w-80 relative flex flex-col">
    //   {/* Top labels */}
    //   <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
    //     {isPrivate && (
    //       <span className="bg-black text-white text-xs font-semibold px-3 py-1 rounded-full">
    //         Private
    //       </span>
    //     )}
    //     {needsRepair && (
    //       <span className="bg-orange-400 text-white text-xs font-semibold px-2 py-1 rounded">
    //         Needs Repair
    //       </span>
    //     )}
    //   </div>
    //   {/* Favorite icon */}
    //   <button className="absolute top-3 right-3 bg-white rounded-full p-1 shadow">
    //     <Heart className="w-5 h-5 text-gray-400" />
    //   </button>
    //   {/* Image */}
    //   <img
    //     src={image}
    //     alt={title}
    //     className="w-full h-48 object-cover rounded-lg mt-8"
    //   />
    //   {/* Card content */}
    //   <div className="p-4 flex flex-col gap-1">
    //     <div className="flex justify-between items-center">
    //       <span className="font-bold text-lg">{title}</span>
    //       <span className="font-bold text-2xl text-gray-800 flex items-center gap-1">
    //         <span className="text-base font-normal">₪</span>
    //         {price}
    //       </span>
    //     </div>
    //     <div className="text-gray-500 text-sm">{dimensions}</div>
    //     <div className="text-gray-500 text-sm">{location}</div>
    //     <div className="text-gray-400 text-xs mt-2">
    //       {seller} • {date}
    //     </div>
    //   </div>
    // </div>
  );
}

export default SurfboardCard;
