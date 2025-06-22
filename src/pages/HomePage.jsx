import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import backgroundImage from "../assets/hero_background.jpg";
import SurfboardsCarousel from "../components/Surfboard/SurfboardsCarousel";
import CategoryFilter from "../components/Surfboard/CategoryFilter";
import Title1 from "../components/Text/Title1";
import SubTitle1 from "../components/Text/SubTitle1";
import Title2 from "../components/Text/Title2";
import { useAuth } from "../contexts/AuthContext";
import EditUserModal from "../components/User/EditUserModal";

function Home() {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user && user.metadata?.creationTime === user.metadata?.lastSignInTime) {
      setShowModal(true);
    }
  }, [user]);

  return (
    <div>
      <NavBar />
      <EditUserModal open={showModal} onClose={() => setShowModal(false)} />
      {/* This is the hero section. */}
      <div
        className="flex items-center h-[600px] bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="container flex flex-row">
          {/* Column 1 - With content */}
          <div className="flex-1 flex flex-col gap-y-4">
            <Title1 variant="onDark">הבית של הגולשים בישראל!</Title1>
            <SubTitle1 variant="onDark">
              מצאו את הגלשן המושלם שלכם! אצלנו תתחברו למאות גלשנים מכל הסוגים –
              חדשים ויד שנייה, במקום אחד.
            </SubTitle1>
            <div className="flex flex-row gap-x-4">
              <button className="btn btn-s sm:btn-sm md:btn-md lg:btn-lg xl:btn-lg">
                אני רוצה גלשן!
              </button>
            </div>
          </div>
          {/* Column 2 - No content - empty! */}
          <div className="flex-1 hidden lg:block"></div>
        </div>
      </div>

      {/* This is the surfboards carousel section. */}
      <div className="container flex flex-col justify-items-center py-8">
        <div className="text-center">
          <Title2>הגלשנים החדשים באתר</Title2>
        </div>
        <CategoryFilter />
        <div className="container flex flex-row">
          <SurfboardsCarousel />
        </div>
      </div>
    </div>
  );
}

export default Home;
