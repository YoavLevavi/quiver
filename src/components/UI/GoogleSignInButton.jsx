import React, { useState, useEffect } from "react";
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { auth, googleProvider } from "../../utils/firebase";
import { useNavigate } from "react-router";

function GoogleSignInButton() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          console.log(
            "✅ Logged in with redirect as:",
            result.user.displayName
          );
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("❌ Redirect result error:", error);
        alert("הייתה שגיאה בהתחברות עם גוגל (Redirect). אנא נסה שוב.");
      });
  }, []);

  const handleSignIn = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("✅ Logged in as:", result.user.displayName);
      navigate("/");
    } catch (err) {
      console.error("❌ Sign-in error:", err);

      if (err.code === "auth/popup-blocked") {
        console.log("Popup blocked, trying redirect...");
        try {
          await signInWithRedirect(auth, googleProvider);
        } catch (redirectErr) {
          console.error("❌ Redirect sign-in error:", redirectErr);
          alert(
            "הייתה שגיאה בהתחברות עם גוגל. אנא נסה שוב או אפשר חלונות קופצים."
          );
        }
      } else if (err.code === "auth/popup-closed-by-user") {
        console.log("User closed the sign-in popup");
      } else if (err.code === "auth/cancelled-popup-request") {
        console.log("Sign-in popup request was cancelled");
      } else {
        alert("הייתה שגיאה בהתחברות עם גוגל. אנא נסה שוב.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className="btn bg-white text-black border-[#e5e5e5] flex items-center gap-2"
      onClick={handleSignIn}
      disabled={isLoading}
    >
      {isLoading && (
        <span className="loading loading-spinner loading-sm"></span>
      )}
      <svg
        aria-label="Google logo"
        width="16"
        height="16"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <g>
          <path d="m0 0H512V512H0" fill="#fff"></path>
          <path
            fill="#34a853"
            d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
          ></path>
          <path
            fill="#4285f4"
            d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
          ></path>
          <path
            fill="#fbbc02"
            d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
          ></path>
          <path
            fill="#ea4335"
            d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
          ></path>
        </g>
      </svg>
      {isLoading ? "מתחבר..." : "להתחברות עם גוגל"}
    </button>
  );
}

export default GoogleSignInButton;
