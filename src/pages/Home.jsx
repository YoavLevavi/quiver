import React from "react";
import NavBar from "../components/NavBar";
import backgroundImage from "../assets/hero_background.jpg";

import SurfboardsCarousel from "../features/surfboards/SurfboardsCarousel";

function Home() {
  return (
    <div className="">
      <NavBar />
      {/* This is the hero section. */}
      <div
        className="flex items-center h-[600px] bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="container flex flex-row">
          {/* Column 1 - With content */}
          <div className="flex-1 flex flex-col gap-y-4 text-right">
            <h1 className="text-white">אתם קליק אחד מהגלשן הבא שלכם</h1>
            <h3 className="text-gray-200">
              מצאו את הגלשן המושלם שלכם! אצלנו תתחברו למאות גלשנים מכל הסוגים –
              חדשים ויד שנייה, במקום אחד.
            </h3>
            <div className="flex flex-row gap-x-4">
              <button class="btn btn-s sm:btn-sm md:btn-md lg:btn-lg xl:btn-lg">
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
          <h2 className="">החדשים באתר</h2>
        </div>
        <div className="container flex flex-row">
          <SurfboardsCarousel />
        </div>
        <button className="btn">Default</button>
      </div>
    </div>
  );
}

export default Home;
