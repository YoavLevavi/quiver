import { createRoot } from "react-dom/client";
import "./styles/index.css";
import React from "react";
import InstallPrompt from "./components/UI/InstallPrompt";
import ReactGA from "react-ga4";
import AppWrapper from "./components/UI/AppWrapper";

// Initialize Google Analytics only if measurement ID is available
const gaId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;
if (gaId) {
  ReactGA.initialize(gaId);
  // Track initial page view
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
} else {
  console.warn(
    "Google Analytics not initialized: VITE_GOOGLE_ANALYTICS_ID not found"
  );
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").then(
      (registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      },
      (error) => {
        console.error("Service Worker registration failed:", error);
      }
    );
  });
}

createRoot(document.getElementById("root")).render(
  <>
    <AppWrapper />
    <InstallPrompt />
  </>
);
