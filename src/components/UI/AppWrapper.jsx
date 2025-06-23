import React from "react";
import { AuthProvider } from "../../contexts/AuthContext.jsx";
import { BrowserRouter } from "react-router";
import LoadingPage from "./LoadingPage";
import TrackPageView from "./TrackPageView";
import App from "../../App.jsx";

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

export default AppWrapper;
