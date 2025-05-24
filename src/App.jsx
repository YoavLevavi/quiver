import { useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router";
import useAuthStore from "./store/useAuthStore";
import Profile from "./pages/Profile";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          {/* Add more routes as needed */}
        </Routes>
      </QueryClientProvider>
    </>
  );
}
export default App;
