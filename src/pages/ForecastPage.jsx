/**
 * Forecast component displays a surf forecast for a selected spot in Israel.
 *
 * Features:
 * - Fetches and displays current weather, marine, and sun data for a selected spot.
 * - Allows users to select a surf spot and toggle between metric and imperial units.
 * - Shows key conditions (water/air temperature, wave height/period/direction, wind speed/direction, UV index, sunrise/sunset) in info cards.
 * - Renders a daily max wave height chart.
 * - Handles loading and error states gracefully.
 *
 * @component
 * @returns {JSX.Element} The forecast page UI.
 */
import React, { useEffect, useState } from "react";
import ForecastChart from "../components/Forecast/ForecastChart";
import SpotSelector from "../components/Forecast/SpotSelector";
import NavBar from "../components/NavBar";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import SubTitle1 from "../components/Text/SubTitle1";
import Title1 from "../components/Text/Title1";
import TextSmall from "../components/Text/TextSmall";
import InfoCard from "../components/UI/InfoCard";
import UnitToggle from "../components/UI/UnitToggle";
import {
  Thermometer,
  Waves,
  Clock,
  Wind,
  Compass,
  SunMedium,
  Sunrise,
  Sunset,
  ThermometerSun,
  ArrowUp,
} from "lucide-react";

import {
  fetchOneCallWeather,
  fetchMarineData,
  fetchSunData,
} from "../api/forecastApi";
import { toFeet, toKmh } from "../utils/conversions";

const DEFAULT_SPOT = {
  name: "אשדוד, לידו",
  lat: 31.81235932977217,
  lng: 34.63863686370215,
  image:
    "https://www.ashdod.muni.il/media/16495077/%D7%AA%D7%9E%D7%95%D7%A0%D7%95%D7%AA-%D7%90%D7%95%D7%95%D7%99%D7%A8-%D7%9E%D7%99%D7%99%D7%A7-%D7%90%D7%93%D7%A8%D7%99-53.jpg",
};

function Forecast() {
  const [selectedSpot, setSelectedSpot] = useState(DEFAULT_SPOT);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unit, setUnit] = useState("m");
  const [conditions, setConditions] = useState({
    waterTemp: null,
    waveHeight: null,
    wavePeriod: null,
    waveDirection: null,
    windSpeed: null,
    windDirection: null,
    uvIndex: null,
    sunrise: null,
    sunset: null,
    airTemp: null,
  });
  const [error, setError] = useState(null);

  const formatValue = (val, decimals = 1, suffix = "") =>
    val !== null && val !== undefined
      ? `${val.toFixed(decimals)}${suffix}`
      : "N/A";

  const extractCurrentValues = (weatherJson, marineJson, sunJson) => {
    const now = new Date().toISOString().slice(0, 13);
    const marineIndex = marineJson.hourly?.time?.findIndex((t) =>
      t.startsWith(now)
    );

    const newConditions = {
      airTemp: weatherJson.current?.temp ?? null,
      windSpeed: weatherJson.current?.wind_speed ?? null,
      windDirection: weatherJson.current?.wind_deg ?? null,
      uvIndex: weatherJson.current?.uvi ?? null,

      sunrise: sunJson.daily?.sunrise?.[0] ?? null,
      sunset: sunJson.daily?.sunset?.[0] ?? null,
      waterTemp:
        marineIndex !== -1
          ? marineJson.hourly?.sea_surface_temperature?.[marineIndex]
          : null,
      waveHeight:
        marineIndex !== -1
          ? marineJson.hourly?.wave_height?.[marineIndex]
          : null,
      wavePeriod:
        marineIndex !== -1
          ? marineJson.hourly?.wave_period?.[marineIndex]
          : null,
      waveDirection:
        marineIndex !== -1
          ? marineJson.hourly?.wave_direction?.[marineIndex]
          : null,
    };

    setConditions(newConditions);

    // ✅ Group hourly data by date and take max wave height per day
    const timeArray = marineJson.hourly?.time || [];
    const waveHeights = marineJson.hourly?.wave_height || [];

    const dailyMaxMap = new Map();

    timeArray.forEach((timestamp, i) => {
      const dateOnly = timestamp.split("T")[0]; // e.g., "2025-06-08"
      const height = waveHeights[i];

      if (!dailyMaxMap.has(dateOnly) || height > dailyMaxMap.get(dateOnly)) {
        dailyMaxMap.set(dateOnly, height);
      }
    });

    const chartData = Array.from(dailyMaxMap.entries()).map(
      ([dateStr, wave]) => ({
        day: dateStr,
        wave: wave.toFixed(2),
      })
    );

    setData(chartData);
  };

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        setLoading(true);
        setError(null);

        const [weatherRes, marineRes, sunRes] = await Promise.allSettled([
          fetchOneCallWeather(selectedSpot.lat, selectedSpot.lng),
          fetchMarineData(selectedSpot.lat, selectedSpot.lng),
          fetchSunData(selectedSpot.lat, selectedSpot.lng),
        ]);

        extractCurrentValues(
          weatherRes.status === "fulfilled" ? weatherRes.value : {},
          marineRes.status === "fulfilled" ? marineRes.value : {},
          sunRes.status === "fulfilled" ? sunRes.value : {}
        );
      } catch (err) {
        setError("שגיאה בטעינת התחזית");
        console.error("Error fetching forecast:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [selectedSpot]);

  const infoCards = [
    {
      icon: <Thermometer />,
      label: "טמפרטורת המים",
      value: formatValue(conditions.waterTemp, 1, "°C"),
    },
    {
      icon: <ThermometerSun />,
      label: "טמפרטורת האוויר",
      value: formatValue(conditions.airTemp, 1, "°C"),
    },
    {
      icon: <Waves />,
      label: "גובה הגל",
      value:
        unit === "m"
          ? formatValue(conditions.waveHeight, 1, " מ'")
          : formatValue(
              conditions.waveHeight !== null
                ? toFeet(conditions.waveHeight)
                : null,
              1,
              " פיט"
            ),
    },
    {
      icon: <Clock />,
      label: "תקופת הגל",
      value: formatValue(conditions.wavePeriod, 1, " שניות"),
    },
    {
      icon: (
        <ArrowUp
          style={{
            transform: `rotate(${conditions.waveDirection + 180 || 0}deg)`,
          }}
        />
      ),
      label: "כיוון הגל",
      value: formatValue(conditions.waveDirection, 0, "°"),
    },
    {
      icon: <Wind />,
      label: "מהירות הרוח",
      value: formatValue(
        conditions.windSpeed !== null ? toKmh(conditions.windSpeed) : null,
        1,
        ' קמ"ש'
      ),
    },
    {
      icon: (
        <ArrowUp
          style={{
            transform: `rotate(${conditions.windDirection + 180 || 0}deg)`,
          }}
        />
      ),
      label: "כיוון הרוח",
      value: formatValue(conditions.windDirection, 0, "°"),
    },
    {
      icon: <SunMedium />,
      label: "UV אינדקס",
      value: formatValue(conditions.uvIndex, 1),
    },
    {
      icon: <Sunrise />,
      label: "זריחה",
      value: conditions.sunrise
        ? new Date(conditions.sunrise).toLocaleTimeString("he-IL", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "N/A",
    },
    {
      icon: <Sunset />,
      label: "שקיעה",
      value: conditions.sunset
        ? new Date(conditions.sunset).toLocaleTimeString("he-IL", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "N/A",
    },
  ];

  return (
    <>
      <NavBar />
      <div
        className="flex justify-center text-center items-center h-[400px] bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/1139541/pexels-photo-1139541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
        }}
        role="img"
        aria-label="רקע של ים וגלים"
      >
        <div className="flex flex-col gap-y-4">
          <Title1 variant="onDark">תחזית גלים בישראל</Title1>
          <SubTitle1 variant="onDark">
            תחזית גלים מעודכנת במיוחד לגולשים בישראל
          </SubTitle1>
        </div>
      </div>

      {/* Section: Location name + selector */}
      <div className="container">
        <div
          className="relative z-10 max-w-3xl mx-auto -mt-16 rounded-2xl overflow-hidden shadow-lg h-48"
          style={{
            backgroundImage: `url(${selectedSpot.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          role="img"
          aria-label={`תמונה של ${selectedSpot.name}`}
        >
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center px-6 py-8">
            <h2 className="text-2xl font-bold text-white mb-2 drop-shadow">
              תחזית עבור <span>{selectedSpot.name}</span>
            </h2>
            <TextSmall className="text-white mb-4 drop-shadow">
              שנה מיקום כדי לראות תחזית בספוט אחר
            </TextSmall>
            <div className="w-full max-w-sm">
              <SpotSelector
                selected={selectedSpot}
                onChange={setSelectedSpot}
                aria-label="בחר מיקום"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section: Unit toggle */}
      <div className="container flex flex-row justify-center py-6">
        <UnitToggle
          unit={unit}
          onChange={setUnit}
          aria-label="החלף יחידות מידה"
        />
      </div>
      {/* Section: Forecast chart and info cards */}
      <div className="p-4 max-w-4xl mx-auto">
        {error && (
          <div
            className="alert alert-error my-4"
            role="alert"
            aria-live="assertive"
          >
            {error === "No ocean/sea at this location"
              ? "התחזית הימית אינה זמינה למיקום זה. בחר נקודה בים."
              : error}
          </div>
        )}
        {loading ? (
          <LoadingIndicator aria-label="טוען נתונים..." />
        ) : (
          <>{!error && <ForecastChart data={data} unit={unit} />}</>
        )}
      </div>
      {/* Section: Info cards */}
      <div
        className="container grid grid-cols-2 lg:grid-cols-4 gap-4 py-6"
        role="list"
        aria-label="כרטיסי מידע על תנאי הים"
      >
        {infoCards.map((card, idx) => (
          <InfoCard
            key={idx}
            icon={card.icon}
            label={card.label}
            value={card.value}
            aria-label={`${card.label}: ${card.value}`}
            role="listitem"
          />
        ))}
      </div>
    </>
  );
}

export default Forecast;
