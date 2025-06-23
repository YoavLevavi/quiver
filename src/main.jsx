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

function AppWrapper() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate app initialization or data fetching
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <TrackPageView /> {/* Add TrackPageView to track page views */}
        <App />
      </BrowserRouter>
    </AuthProvider>
  );
}

createRoot(document.getElementById("root")).render(
  <>
    <AppWrapper />
    <InstallPrompt />
  </>
);
