import React from "react";
import TextRegular from "../components/Text/TextBody";
import GoogleSignInButton from "../components/UI/GoogleSignInButton";

function Login() {
  return (
    <div
      className="flex flex-col h-screen justify-center items-center"
      style={{
        backgroundImage: `url("https://images.pexels.com/photos/1298684/pexels-photo-1298684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")`,
      }}
    >
      <div className="card max-w-full bg-base-100 card-lg shadow-sm ">
        <div className="card-body">
          <div className="flex flex-col gap-y-4">
            <div className="flex justify-center">
              <h2 className="card-title">ברוכים הבאים לQuiver</h2>
            </div>
            <GoogleSignInButton />
            <TextRegular>
              כרגע ניתן להצטרף רק דרך התחברות עם גוגל 😁
            </TextRegular>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
