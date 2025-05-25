import clsx from "clsx";
import React from "react";

/**
 * SubTitle1 component renders a styled subtitle with customizable styles.
 *
 * @param {Object} props
 * @param {boolean} [props.bold=false] - If true, applies bold font weight to the subtitle.
 * @param {string} [props.variant="onLight"] - "onLight" for dark text on light backgrounds, "onDark" for light text on dark backgrounds.
 * @param {React.ReactNode} props.children - Content to display inside the subtitle.
 * @param {string} [props.className] - Additional CSS classes to apply to the subtitle.
 * @returns {JSX.Element}
 */
function SubTitle1({
  bold = false, // Whether the subtitle should be bold
  variant = "onLight", // Determines the color scheme
  children, // Content to display
  className, // Additional CSS classes
  ...props // Catch all additional props (dir, id, etc.)
}) {
  // Map variant to corresponding Tailwind color classes
  const colorMap = {
    onLight: "text-base-content/95", // Dark text for light backgrounds, with 95% opacity
    onDark: "text-neutral-content/95", // Light/gray text for dark backgrounds, with 95% opacity
  };
  // Select color class based on variant, default to onLight if unknown
  const colorClass = colorMap[variant] || "text-base-content/95";

  return (
    <p
      className={clsx(
        "text-lg md:text-xl xl:text-2xl leading-snug", // Base text size and leading for subtitles
        bold && "font-bold", // Conditionally apply bold font weight
        colorClass, // Apply color class based on variant
        className // Merge any additional classes passed in
      )}
      {...props} // Spread any additional props (like dir, id, etc.)
    >
      {children}
    </p>
  );
}

export default SubTitle1;
