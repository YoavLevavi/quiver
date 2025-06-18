// Place in App.jsx or a top-level component
import { useEffect, useState } from "react";

function isMobile() {
  return /android|iphone|ipad|ipod|windows phone/i.test(navigator.userAgent);
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (!isMobile()) return; // Only show on mobile devices
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => setShowPrompt(false));
    }
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center z-50 px-2">
      <div className="card bg-base-100 border border-primary shadow-xl max-w-md w-full flex-row items-center p-3 gap-3">
        <figure>
          <img
            src="/icon-192.png"
            alt="Quiver"
            className="w-12 h-12 rounded-xl border bg-primary"
          />
        </figure>
        <div className="flex-1 text-right">
          <div className="font-bold text-primary text-base">התקן את Quiver</div>
          <div className="text-xs text-gray-500">
            הוסף את Quiver למסך הבית שלך לחוויה מהירה ונוחה
          </div>
        </div>
        <button
          className="btn btn-primary btn-sm font-bold"
          onClick={handleInstall}
        >
          התקן
        </button>
      </div>
    </div>
  );
}
