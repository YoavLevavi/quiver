import { useState, useEffect } from "react";

const useResponsivePadding = () => {
  const [padding, setPadding] = useState({ left: 40, right: 40 });

  useEffect(() => {
    /**
     * Handles window resize events and updates padding values based on the current window width.
     * 
     * - Sets padding to { left: 10, right: 10 } for widths less than 500px.
     * - Sets padding to { left: 15, right: 15 } for widths between 500px and 767px.
     * - Sets padding to { left: 35, right: 35 } for widths 768px and above.
     *
     * @function
     * @returns {void}
     */
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 500) {
        setPadding({ left: 10, right: 10 });
      } else if (width < 768) {
        setPadding({ left: 15, right: 15 });
      } else {
        setPadding({ left: 35, right: 35 });
      }
    };

    handleResize(); // Initial call
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return padding;
};

export default useResponsivePadding;
