import { useEffect } from "react";
import { useLocation } from "react-router";
import ReactGA from "react-ga4";

const TrackPageView = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);

  return null;
};

export default TrackPageView;
