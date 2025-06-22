// עדכון כותרת ותיאור עבור דף 500
import React from "react";

function ServerErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">500 - שגיאת שרת</h1>
      <p className="text-lg mt-4">אופס! משהו השתבש בצד שלנו.</p>
      <a href="/" className="btn btn-primary mt-6">
        חזרה לדף הבית
      </a>
    </div>
  );
}

export default ServerErrorPage;
