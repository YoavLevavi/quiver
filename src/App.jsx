import { useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router";
import useAuthStore from "./store/useAuthStore";
import Profile from "./pages/Profile";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoute from "./components/ProtectedRoute";
import EditUserComp from "./components/User/EditUserComp";
import SurfboardsCarousel from "./components/Surfboard/SurfboardsCarousel";
import UploadSurfboardForm from "./components/Surfboard/UploadSurfboardForm";
import SurfboardDetails from "./pages/SurdboardDetails";
import Forecast from "./pages/Forecast";

function App() {
  const { initAuth } = useAuthStore();
  const queryClient = new QueryClient();

  useEffect(() => {
    initAuth(); // Start auth tracking
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="forecast" element={<Forecast />} />
          <Route path="/login" element={<Login />} />
          <Route path="/surfboards/:id" element={<SurfboardDetails />} />
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
            <Route path="my-surfboards" element={<SurfboardsCarousel />} />
            <Route path="upload-surfboard" element={<UploadSurfboardForm />} />
          </Route>
          {/* Add more routes as needed */}
        </Routes>
      </QueryClientProvider>
    </>
  );
}
export default App;
