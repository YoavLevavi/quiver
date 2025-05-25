import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import useAuthStore from "../store/useAuthStore";
import SurfboardsCarousel from "../components/Surfboard/SurfboardsCarousel";
import useSurfboardStore from "../store/useSurfboardStore";
import useUserStore from "../store/useUserStore";
import UserCardComp from "../components/User/UserCardComp";
import Title2 from "../components/Text/Title2";

function Profile() {
  const { user } = useAuthStore();
  const loadingAuth = useAuthStore((state) => state.loading);
  const { userData, fetchUserData, loadingUser } = useUserStore();

  // Access fetchUserSurfboards from the store
  const fetchUserSurfboards = useSurfboardStore(
    (state) => state.fetchUserSurfboards
  );

  useEffect(() => {
    if (user?.uid) {
      fetchUserData();
      fetchUserSurfboards(user.uid);
    }
  }, [user, fetchUserSurfboards, fetchUserData]);

  if (loadingAuth) {
    return (
      <div className="flex h-screen justify-center items-center">
        <span className="loading loading-dots loading-xl text-info"></span>
      </div>
    );
  }

  if (!user) {
    // Optionally, redirect to login or show a message
    return (
      <div className="flex h-screen justify-center items-center">
        <div>Please sign in to view your profile.</div>
      </div>
    );
  }

  return (
    <div>
      <NavBar />

      <UserCardComp user={user} userData={userData} />

      {/* User listed surfboards */}
      <div className="container flex flex-col justify-items-center py-6">
        <div className="text-center">
          <Title2>הגלשנים שלך</Title2>
        </div>
        <div className="container flex flex-row py-6">
          <SurfboardsCarousel />
        </div>
      </div>
    </div>
  );
}

export default Profile;
