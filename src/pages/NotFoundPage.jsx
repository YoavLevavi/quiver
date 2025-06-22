// עדכון כותרת ותיאור עבור דף 404
import React from "react";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404 - הדף לא נמצא</h1>
      <p className="text-lg mt-4">מצטערים, הדף שחיפשתם לא קיים.</p>
      <a href="/" className="btn btn-primary mt-6">
        חזרה לדף הבית
      </a>
    </div>
  );
}

export default NotFoundPage;
