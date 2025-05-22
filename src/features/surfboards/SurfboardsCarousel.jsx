import SurfboardCard from "./SurfboardCard";

function SurfboardsCarousel() {
  return (
    <div className="flex flex-row flex-wrap justify-between py-8 gap-y-8">
      {[1, 2, 3, 4, 5, 6].map((item, index) => (
        <div key={index}>
          <SurfboardCard
            image={
              "https://drivergear.vw.com/store/20200424693/assets/items/largeimages/DRGD7180.jpg"
            }
            isPrivate={true}
            needsRepair={index % 3 === 0}
            title={`Surfboard Model ${item}`}
            price={`$${(item * 1000).toLocaleString()}`}
            dimensions="24 x 234 x 234"
            length="20"
            width="15"
            volume="26.7"
            location="גדרה"
            seller="יואב לבבי"
            date="13/10/2025"
            condition={"used - good as new"}
          />
        </div>
      ))}
    </div>
  );
}

export default SurfboardsCarousel;
