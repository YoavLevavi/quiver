import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { BrowserRouter } from "react-router";
import React from "react";
import LoadingPage from "./components/UI/LoadingPage";
import InstallPrompt from "./components/UI/InstallPrompt";
import TrackPageView from "./components/UI/TrackPageView"; // Import the TrackPageView component
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
