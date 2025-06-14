// import quiverLogo from "../assets/quiver_logo_svg.svg";

import React, { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { NavLink } from "react-router";
import HamburgerIcon from "./UI/HamburgerIcon";
import UploadSurfboardModal from "./Surfboard/UploadSurfboardModal";
import { Plus } from "lucide-react";

/**
 * NavBar component renders the main navigation bar for the application.
 *
 * Features:
 * - Responsive design with a hamburger menu for mobile devices.
 * - Displays the application logo and navigation links.
 * - Includes a search bar for searching surfboards.
 * - Shows user profile avatar and dropdown menu when authenticated.
 * - Provides login button when user is not authenticated.
 *
 * Uses:
 * - `useAuthStore` hook to access user authentication state and logout function.
 * - `NavLink` from react-router-dom for navigation.
 *
 * @component
 * @returns {JSX.Element} The rendered navigation bar component.
 */
function NavBar() {
  const { user, logout } = useAuthStore();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm flex justify-between">
        <div className="flex justify-between items-center">
          {/* Hamburger menu for mobile */}
          <div className="flex-none lg:hidden">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost md:hidden">
                {/* Hamburger icon */}
                <HamburgerIcon />
              </label>
              <ul
                tabIndex={0}
                className="menu menu-md dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <NavLink to={"/forecast"}>תחזית</NavLink>
                </li>
                <li>
                  <NavLink to={"/stores"}>חנויות</NavLink>
                </li>
                <li>
                  <a>גלשנים יד שניה</a>
                </li>
                <li>
                  <a>פרופיל</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Logo */}
          <NavLink to="/">
            <button className="flex-1 btn btn-ghost text-xl">Quiver</button>
          </NavLink>
          {/* Desktop menu and search bar */}
          <div className="hidden md:block">
            <ul className="menu menu-horizontal px-1 ">
              <li>
                <NavLink to={"/forecast"}>תחזית</NavLink>
              </li>
              <li>
                <a>חנויות</a>
              </li>
              <li>
                <a>גלשנים יד שניה</a>
              </li>
            </ul>
          </div>
          {/* <div className="flex-1">
          <label className="input border-2 border-gray-200 rounded-xl ">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input type="search" required placeholder="לחיפוש גלשנים" />
          </label>
        </div> */}
        </div>

        {/* Profile and Add Surfboard Button */}
        <div className="flex items-center gap-2">
          {/* Desktop: Add Surfboard Button (only if logged in) */}
          {user && (
            <button
              className="btn hidden sm:inline-flex"
              onClick={() => setModalOpen(true)}
              aria-label="הוסף גלשן חדש"
            >
              הוסף גלשן למכירה
            </button>
          )}
          {/* User Avatar/Profile */}
          <div className="flex-none">
            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt={user.displayName || "User"}
                      src={user.photoURL || "/default-avatar.png"}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-md dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <NavLink to="/profile">פרופיל</NavLink>
                  </li>
                  <li>
                    <a>הגדרות</a>
                  </li>
                  <li>
                    <a onClick={logout}>התנתקות</a>
                  </li>
                </ul>
              </div>
            ) : (
              <a href="/login" className="btn btn-sm btn-natural">
                התחבר
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Mobile FAB: Add Surfboard (only if logged in) */}
      {user && (
        <button
          className="sm:hidden fixed bottom-6 left-6 z-50 btn btn-primary btn-circle shadow-lg flex items-center justify-center"
          style={{ width: 56, height: 56 }}
          onClick={() => setModalOpen(true)}
          aria-label="הוסף גלשן חדש"
        >
          <Plus size={28} />
        </button>
      )}

      {/* Upload Surfboard Modal */}
      <UploadSurfboardModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}

export default NavBar;
