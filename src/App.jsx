import { useEffect } from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router";
import useAuthStore from "./store/useAuthStore";
import Profile from "./pages/ProfilePage";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoute from "./components/ProtectedRoute";
import EditUserComp from "./components/User/EditUserComp";
import UploadSurfboardForm from "./components/Surfboard/UploadSurfboardForm";
import ForecastPage from "./pages/ForecastPage";
import SurfboardDetailsPage from "./pages/SurfboardDetailsPage";
import InstallPrompt from "./components/UI/InstallPrompt";
import UserOwedSurfboardsCarousel from "./components/Surfboard/UserOwedSurfboardsCarousel";
import Footer from "./components/Footer";

function App() {
  const { initAuth } = useAuthStore();
  const queryClient = new QueryClient();

  useEffect(() => {
    initAuth(); // Start auth tracking
  }, []);

  return (
    <>
      <InstallPrompt />
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="forecast" element={<ForecastPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/surfboards/:id" element={<SurfboardDetailsPage />} />
          {/* Protected routes for profile and surfboard management */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          >
            {/* Default (index) route for /profile */}
            <Route index element={<EditUserComp />} />
            {/* /profile/edit route */}
            <Route path="edit" element={<EditUserComp />} />
            <Route
              path="my-surfboards"
              element={<UserOwedSurfboardsCarousel />}
            />
            <Route path="upload-surfboard" element={<UploadSurfboardForm />} />
          </Route>
          {/* Add more routes as needed */}
        </Routes>
      </QueryClientProvider>
      <Footer />
    </>
  );
}
export default App;
