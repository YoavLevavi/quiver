// Place in App.jsx or a top-level component
import { useEffect, useState } from "react";

function isMobile() {
  return /android|iphone|ipad|ipod|windows phone/i.test(navigator.userAgent);
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if the device is iOS
    const userAgent = window.navigator.userAgent;
    const isIOSDevice = /iPhone|iPad|iPod/.test(userAgent);
    setIsIOS(isIOSDevice);

    if (isIOSDevice) {
      setIsVisible(true);
      return;
    }

    const handleBeforeInstallPrompt = (e) => {
      console.log("beforeinstallprompt event fired");
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null);
        setIsVisible(false);
      });
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">
            {isIOS ? "הוסף למסך הבית" : "התקן את האפליקציה"}
          </h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={handleClose}
            aria-label="סגור"
          >
            ✕
          </button>
        </div>
        <div className="text-sm mb-4">
          {isIOS ? (
            <p>
              להוספת האפליקציה למסך הבית, לחץ על כפתור השיתוף ולאחר מכן על "הוסף
              למסך הבית".
            </p>
          ) : (
            <p>התקן את האפליקציה לשימוש מהיר ונוח!</p>
          )}
        </div>
        {!isIOS && (
          <button
            className="btn btn-primary w-full"
            onClick={handleInstallClick}
            aria-label="התקן את האפליקציה"
          >
            התקן עכשיו
          </button>
        )}
      </div>
    </div>
  );
}
