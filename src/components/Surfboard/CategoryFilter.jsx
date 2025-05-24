import React from "react";
import clsx from "clsx";
import useSurfboardStore from "../../store/useSurfboardStore";

const categories = [
  { label: "הכל", value: "all" },
  { label: "שורטבורד", value: "shortboard" },
  { label: "לונגבורד", value: "longboard" },
  { label: "פיש", value: "fish" },
  { label: "פאנבורד", value: "funboard" },
  { label: "סופטבורד", value: "softboard" },
  { label: "וינטג'", value: "vintage" },
];
function CategoryFilter({ selected, onSelect }) {
  const { filters, setFilter, fetchSurfboards } = useSurfboardStore();

  const handleCategoryChange = (category) => {
    if (filters.category === category) return;
    setFilter("category", category);
    fetchSurfboards();
  };

  return (
    <div className="tabs tabs-bottom overflow-x-auto w-full py-4 justify-center">
      {categories.map(({ label, value }) => (
        <button
          key={value}
          className={clsx(
            "tab text-base md:text-lg whitespace-nowrap transition",
            filters.category === value && "tab-active font-bold"
          )}
          onClick={() => {
            handleCategoryChange(value);
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
