import React from "react";

function LoadingIndicator() {
  return (
    <div className="flex h-screen justify-center items-center">
      <span className="loading loading-dots loading-xl text-info"></span>
    </div>
  );
}

export default LoadingIndicator;
