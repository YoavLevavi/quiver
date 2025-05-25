import clsx from "clsx";
import React from "react";

/**
 *
 * Title2 component renders a secondary heading with customizable styles.
 *
 * @param {Object} props
 * @param {boolean} [props.bold=true] - If true, applies bold font weight.
 * @param {string} [props.variant="onLight"] - "onLight" for dark text on light backgrounds, "onDark" for light text on dark backgrounds.
 * @param {React.ReactNode} props.children - Content to display inside the heading.
 * @param {string} [props.className] - Additional CSS classes to apply.
 * @returns {JSX.Element}
 */
function Title2({
  bold = true,
  variant = "onLight",
  children,
  className,
  ...props
}) {
  // Define a mapping for color classes based on the variant prop
  const colorMap = {
    onLight: "text-base-content",
    onDark: "text-neutral-content",
  };

  // Determine the color class based on the variant prop
  const colorClass = colorMap[variant] || "text-base-content";

  return (
    <h2
      className={clsx(
        "text-2xl md:text-4xl leading-snug", // Base styles for heading size and spacing
        bold && "font-bold", // Conditionally apply bold font
        colorClass, // Apply color class based on variant
        className // Merge any additional classes
      )}
      {...props} // Spread any additional props
    >
      {children}
    </h2>
  );
}

export default Title2;
