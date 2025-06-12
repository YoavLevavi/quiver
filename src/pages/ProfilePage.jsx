import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import useAuthStore from "../store/useAuthStore";
import SurfboardsCarousel from "../components/Surfboard/SurfboardsCarousel";
import useSurfboardStore from "../store/useSurfboardStore";
import useUserStore from "../store/useUserStore";
import UserCardComp from "../components/User/UserCardComp";
import Title2 from "../components/Text/Title2";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import UploadSurfboardForm from "../components/Surfboard/UploadSurfboardForm";
import { Link, NavLink, Outlet } from "react-router";
import TextLarge from "../components/Text/TextLarge";

// Profile page component
function Profile() {
  // Get current user from auth store
  const { user } = useAuthStore();
  // Get loading state for authentication
  const loadingAuth = useAuthStore((state) => state.loading);
  // Get user data and loading state from user store
  const { userData, fetchUserData, loadingUser } = useUserStore();

  // Get fetchUserSurfboards function from surfboard store
  const fetchUserSurfboards = useSurfboardStore(
    (state) => state.fetchUserSurfboards
  );

  // Fetch user data and surfboards when user changes
  useEffect(() => {
    if (user?.uid) {
      fetchUserData();
      fetchUserSurfboards(user.uid);
    }
  }, [user, fetchUserSurfboards, fetchUserData]);

  // Show loading spinner while authentication is loading
  if (loadingAuth) {
    return <LoadingIndicator />;
  }

  // Show message if user is not signed in
  if (!user) {
    // Optionally, redirect to login or show a message
    return (
      <div className="flex h-screen justify-center items-center">
        <TextLarge>נא להתחבר כדי לצפות בפרופיל!</TextLarge>
      </div>
    );
  }

  return (
    <>
      <NavBar />

      <div className="container mx-auto py-6 flex flex-col lg:flex-row gap-4">
        <div className="flex-1/4 flex flex-col gap-4 ">
          <UserCardComp user={user} userData={userData} className="w-full " />
          <ul className="menu menu-lg lg:menu-lg bg-base-200 rounded-2xl w-full p-6">
            <li>
              <NavLink
                to="/profile/edit"
                className={
                  ("flex items-center gap-2",
                  ({ isActive }) => (isActive ? "menu-active" : ""))
                }
              >
                <i className="fas fa-user"></i>
                הפרופיל שלי
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/profile/upload-surfboard"
                className={
                  ("flex items-center gap-2",
                  ({ isActive }) => (isActive ? "menu-active" : ""))
                }
              >
                <i className="fas fa-user"></i>
                להעלאת גלשן
              </NavLink>
            </li>

            <li>
              <NavLink
                to="my-surfboards"
                className={
                  ("flex items-center gap-2",
                  ({ isActive }) => (isActive ? "menu-active" : ""))
                }
              >
                <i className="fas fa-heart"></i>
                הגלשנים/המוצרים שלי
              </NavLink>
            </li>
            <li>
              <NavLink
                to="upload"
                className={
                  ("flex items-center gap-2",
                  ({ isActive }) => (isActive ? "menu-active" : ""))
                }
              >
                <i className="fas fa-heart"></i>
                גלשנים/מוצרים שאהבתי
              </NavLink>
            </li>
            <li>
              <NavLink
                to="notifications"
                className={
                  ("flex items-center gap-2",
                  ({ isActive }) => (isActive ? "menu-active" : ""))
                }
              >
                <i className="fas fa-heart"></i>
                התראות
              </NavLink>
            </li>
            <li>
              <NavLink
                to="settings"
                className={
                  ("flex items-center gap-2",
                  ({ isActive }) => (isActive ? "menu-active" : ""))
                }
              >
                <i className="fas fa-heart"></i>
                הגדרות
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="flex-3/4 rounded-box px-6">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Profile;
