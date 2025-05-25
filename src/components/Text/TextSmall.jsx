import React from "react";
import clsx from "clsx";
/**
 * TextBody component renders a paragraph with customizable text styles.
 *
 * @param {Object} props
 * @param {boolean} [props.bold=true] - If true, applies bold font weight to the text.
 * @param {string} [props.variant="onLight"] - "onLight" for dark text on light backgrounds, "onDark" for light text on dark backgrounds.
 * @param {React.ReactNode} props.children - Content to display inside the paragraph.
 * @param {string} [props.className] - Additional CSS classes to apply to the text.
 * @returns {JSX.Element}
 */
function TextSmall({
  bold = false,
  variant = "onLight",
  children,
  className,
  ...props
}) {
  // Define a mapping for color classes based on the variant prop
  const colorMap = {
    onLight: "text-base-content", // Dark text for light backgrounds
    onDark: "text-neutral-content", // Light/gray text for dark backgrounds
  };

  // Determine the color class based on the variant prop, fallback to "text-base-content"
  const colorClass = colorMap[variant] || "text-base-content";

  return (
    <p
      className={clsx(
        "text-sm", // Base text size for paragraphs
        bold && "font-bold", // Conditionally apply bold font
        colorClass, // Apply color class based on variant
        className // Merge any additional classes
      )}
      {...props} // Spread any additional props
    >
      {children}
    </p>
  );
}

export default TextSmall;
