import { createRoot } from "react-dom/client";
import "./styles/index.css";
import React from "react";
import InstallPrompt from "./components/UI/InstallPrompt";
import ReactGA from "react-ga4";
import AppWrapper from "./components/UI/AppWrapper";

// Initialize Google Analytics
ReactGA.initialize(import.meta.env.VITE_GOOGLE_ANALYTICS_ID);

// Track initial page view
ReactGA.send({ hitType: "pageview", page: window.location.pathname });

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
