import clsx from "clsx";
import React from "react";

/**
 *
 * Title1 component renders a primary heading with customizable styles.
 *
 * @param {Object} props
 * @param {boolean} [props.bold=true] - If true, applies bold font weight to the heading.
 * @param {string} [props.variant="onLight"] - "onLight" for dark text on light backgrounds, "onDark" for light text on dark backgrounds.
 * @param {React.ReactNode} props.children - Content to display inside the heading.
 * @param {string} [props.className] - Additional CSS classes to apply to the heading.
 * @returns {JSX.Element}
 */

function Title1({
  bold = true,
  variant = "onLight",
  children,
  className,
  ...props
}) {
  // Define a mapping for color classes based on the variant prop
  const colorMap = {
    onLight: "text-base-content",
    onDark: "text-base-100",
  };

  // Determine the color class based on the variant prop
  const colorClass = colorMap[variant] || "text-base-content";

  return (
    <h1
      className={clsx(
        "text-4xl md:text-6xl xl:text-7xl leading-tight", // Base styles for heading size and spacing
        bold && "font-bold", // Conditionally apply bold font
        colorClass, // Apply color class based on variant
        className // Merge any additional classes
      )}
      {...props} // Spread any additional props
    >
      {children}
    </h1>
  );
}

export default Title1;
