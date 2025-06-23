import { useEffect } from "react";
import { useLocation } from "react-router";
import ReactGA from "react-ga4";

const TrackPageView = () => {
  const location = useLocation();

  useEffect(() => {
    // Only track if Google Analytics is initialized
    const gaId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;
    if (gaId) {
      ReactGA.send({ hitType: "pageview", page: location.pathname });
    }
  }, [location]);

  return null;
};

export default TrackPageView;
