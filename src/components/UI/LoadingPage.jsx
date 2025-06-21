import React from "react";
import LoadingIndicator from "./LoadingIndicator";

function LoadingPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <LoadingIndicator aria-label="טוען את האפליקציה..." />
    </div>
  );
}

export default LoadingPage;
