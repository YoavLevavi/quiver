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
  SunMedium,
  Sunrise,
  Sunset,
  ThermometerSun,
  ArrowUp,
} from "lucide-react";

import {
  fetchMarineData,
  fetchSunData,
  fetchWeatherData,
} from "../api/forecastApi";
import { toFeet } from "../utils/conversions";
import DayForecastDetailsV2 from "../components/Forecast/DayForecastDetailsV2";
import { formatHebrewDate } from "../utils/format";
import { buildDaySlots } from "../utils/forecastDataUtils";

const DEFAULT_SPOT = {
  name: "אשדוד, לידו",
  lat: 31.81235932977217,
  lng: 34.63863686370215,
  image:
    "https://www.ashdod.muni.il/media/16495077/%D7%AA%D7%9E%D7%95%D7%A0%D7%95%D7%AA-%D7%90%D7%95%D7%95%D7%99%D7%A8-%D7%9E%D7%99%D7%99%D7%A7-%D7%90%D7%93%D7%A8%D7%99-53.jpg",
};

function ForecastPage() {
  // State to hold the selected spot
  const [selectedSpot, setSelectedSpot] = useState(DEFAULT_SPOT);
  // State to hold the forecast data
  const [forecast, setForecast] = useState([]);
  // State to manage loading state
  const [loading, setLoading] = useState(true);
  // State to hold the selected unit (metric or imperial)
  const [unit, setUnit] = useState("m");
  // State to hold the current conditions
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
  // State to hold error messages
  const [error, setError] = useState(null);
  // State to hold marine and weather data
  const [marineData, setMarineData] = useState(null);
  // State to hold weather data
  const [weatherData, setWeatherData] = useState(null);

  // Helper function to format values with a suffix and decimals
  const formatValue = (val, decimals = 1, suffix = "") =>
    val !== null && val !== undefined
      ? `${val.toFixed(decimals)}${suffix}`
      : "N/A";

  // Effect to fetch forecast data when the selected spot changes
  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [weatherRes, marineRes, sunRes] = await Promise.allSettled([
          fetchWeatherData(selectedSpot.lat, selectedSpot.lng),
          fetchMarineData(selectedSpot.lat, selectedSpot.lng),
          fetchSunData(selectedSpot.lat, selectedSpot.lng),
        ]);

        // Check if any of the fetches failed and handle errors
        const weatherJson =
          weatherRes.status === "fulfilled" ? weatherRes.value : null;
        // Marine data might be null if the fetch failed
        const marineJson =
          marineRes.status === "fulfilled" ? marineRes.value : null;
        // Sun data might be null if the fetch failed
        const sunJson = sunRes.status === "fulfilled" ? sunRes.value : null;

        // If any of the data is missing or has an error, set an error message
        if (marineJson?.error || weatherJson?.error) {
          setError("התחזית הימית אינה זמינה למיקום זה. בחר נקודה אחרת.");
          setLoading(false);
          return;
        }

        setMarineData(marineJson);
        setWeatherData(weatherJson);

        if (weatherJson && marineJson && sunJson) {
          const now = new Date().toISOString().slice(0, 13);
          const marineIndex = marineJson.hourly?.time?.findIndex((t) =>
            t.startsWith(now)
          );
          const weatherIndex = weatherJson.hourly?.time?.findIndex((t) =>
            t.startsWith(now)
          );

          setConditions({
            airTemp:
              weatherIndex !== -1
                ? weatherJson.hourly?.temperature_2m?.[weatherIndex]
                : null,
            windSpeed:
              weatherIndex !== -1
                ? weatherJson.hourly?.wind_speed_10m?.[weatherIndex]
                : null,
            windDirection:
              weatherIndex !== -1
                ? weatherJson.hourly?.wind_direction_10m?.[weatherIndex]
                : null,
            uvIndex: sunJson.daily?.uv_index_max?.[0] ?? null,
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
          });
        }

        if (marineJson) {
          const allDays = Array.from(
            new Set(marineJson.hourly.time.map((t) => t.split("T")[0]))
          );

          const fullForecast = allDays.map((dateStr) => {
            const slotsForDay = [];
            marineJson.hourly.time.forEach((timestamp, i) => {
              if (timestamp.startsWith(dateStr)) {
                slotsForDay.push({
                  time: timestamp.split("T")[1],
                  waveHeight:
                    Math.round((marineJson.hourly.wave_height[i] ?? 0) * 10) /
                    10, // Round to the closest tenth
                });
              }
            });
            return { date: dateStr, slots: slotsForDay };
          });
          setForecast(fullForecast);
        }
      } catch (err) {
        setError("שגיאה בטעינת התחזית");
        console.error("Error fetching forecast:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchForecastData();
  }, [selectedSpot]);

  // Extract unique days from marine data for the detailed forecast
  const availableDays = marineData?.hourly?.time
    ? Array.from(new Set(marineData.hourly.time.map((t) => t.split("T")[0])))
    : [];

  // Prepare info cards with icons and values
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
      value:
        conditions.wavePeriod !== null
          ? `${Math.round(conditions.wavePeriod)} שניות`
          : "N/A",
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
      value: formatValue(conditions.windSpeed, 1, ' קמ"ש'),
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
            <SubTitle1
              className="text-2xl font-bold text-white mb-2 drop-shadow"
              variant="onDark"
            >
              תחזית עבור{" "}
              <span className="font-normal">{selectedSpot.name}</span>
            </SubTitle1>
            <TextSmall className="text-white mb-4 drop-shadow" variant="onDark">
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

      <div className="container flex flex-row justify-center py-6">
        <UnitToggle
          unit={unit}
          onChange={setUnit}
          aria-label="החלף יחידות מידה"
        />
      </div>

      <div className="mx-2">
        {error && (
          <div
            className="alert alert-error my-4"
            role="alert"
            aria-live="assertive"
          >
            {error}
          </div>
        )}
        {loading ? (
          <LoadingIndicator aria-label="טוען נתונים..." />
        ) : (
          <>{!error && <ForecastChart forecastData={forecast} unit={unit} />}</>
        )}
      </div>

      {/* Section: Detailed forecast */}
      <div className="">
        <div className="flex flex-col">
          {availableDays.map((dateStr) => (
            <DayForecastDetailsV2
              key={dateStr}
              date={formatHebrewDate(dateStr)}
              slots={
                marineData && weatherData
                  ? buildDaySlots({
                      marineJson: marineData,
                      weatherJson: weatherData,
                      dateStr,
                    })
                  : []
              }
              unit={unit}
            />
          ))}
        </div>
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

export default ForecastPage;
