import React from "react";
import { Heart } from "lucide-react";
import clsx from "clsx";
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
  length,
  width,
  volume,
  condition,
  isFavorite,
}) {
  return (
    <div className="card bg-base-100 w-100 shadow-sm">
      <figure>
        <img
          src="https://borasurfar.com/wp-content/uploads/2025/05/1-2.avif"
          alt={title}
          className="w-full h-100 object-cover"
        />
      </figure>
      <div className="card-body">
        <div className="flex flex-row gap-4">
          <div
            className={clsx("badge p-3", {
              "badge-success": condition === "new",
              "badge-warning": condition === "used - good as new",
              "badge-neutral": condition === "used",
            })}
          >
            מצב הגלשן
          </div>
          <div
            className={clsx("badge p-3", {
              "badge-primary": isPrivate === true,
              "badge-secondary": isPrivate === false,
            })}
          >
            {isPrivate ? "פרטי" : "חנות גלישה"}
          </div>
        </div>
        <h2 className="card-title">כותרת הגלשן</h2>
        <p className="text-gray-600">
          כאן יכנס תיאור הגלשן. כאן יכנס תיאור הגלשן. כאן יכנס תיאור הגלשן. כאן
          יכנס תיאור הגלשן. כאן יכנס תיאור הגלשן. כאן יכנס תיאור הגלשן. כאן
        </p>
        <p className="text-sm">
          {date} • {seller}
        </p>
      </div>
    </div>
  );
}

export default SurfboardCard;
