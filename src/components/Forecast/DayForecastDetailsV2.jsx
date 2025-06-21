import React from "react";
import { ArrowUpRight } from "lucide-react";
import Title3 from "../Text/Title3";
import { convertTemp, getWindSpeedKph, toFeet } from "../../utils/conversions"; // Import toFeet
import { getWindBg } from "../../utils/windUtils";
import {
  getWaveHeightBg,
  calculateWaveQualityRating,
} from "../../utils/waveUtils";

function DayForecastDetailsV2({ date, slots, unit = "ft", tempUnit = "C" }) {
  const filteredSlots = slots
    ? slots.filter((slot) => {
        const hour = parseInt(slot.time.split(":")[0], 10);
        return hour >= 6 && hour <= 21 && hour % 3 === 0;
      })
    : [];

  const starRatings = [1, 2, 3, 4, 5];
  const unitLabel = unit === "m" ? "m" : "ft";

  const waveQualityRatings = filteredSlots.map((slot) =>
    calculateWaveQualityRating(slot, unit)
  );

  return (
    <div className="overflow-hidden">
      <Title3 className="bg-base-200 p-4">{date}</Title3>
      <table className="table w-full text-center ">
        <thead className="bg-base-200">
          <tr className="text-sm text-gray-500">
            <th>שעה</th>
            <th>גובה גל</th>
            <th>דירוג</th>
            <th className="hidden md:block">כיוון הסוול</th>
            <th>רוח</th>
            <th className="hidden md:block">מזג אוויר</th>
          </tr>
        </thead>
        <tbody>
          {filteredSlots.length === 0 ? (
            <tr>
              <td colSpan={6}>אין נתונים להצגה</td>
            </tr>
          ) : (
            filteredSlots.map((slot, i) => {
              const waveHeight =
                unit === "m"
                  ? slot.waveHeight || 0
                  : toFeet(slot.waveHeight || 0); // Convert to feet if needed
              const wavePeriod =
                slot.period !== undefined && slot.period !== null
                  ? Math.round(Number(slot.period))
                  : "—";

              const waveDirection =
                slot.waveDirection !== undefined && slot.waveDirection !== null
                  ? slot.waveDirection
                  : undefined;
              const windBgClass = getWindBg(slot?.windSpeed || 0);
              const windSpeed = getWindSpeedKph(slot.windSpeed);
              const temperature = convertTemp(slot.airTemp || 0, tempUnit);
              const waveHeightBgClass = getWaveHeightBg(slot.waveHeight);
              const waveQualityRating = waveQualityRatings[i];

              if (!slot.time || !slot.waveHeight) {
                console.error("Invalid slot data:", slot);
                return null;
              }

              return (
                <tr key={`${slot.time}-${i}`}>
                  {/* Time */}
                  <td>
                    <span className="writing-vertical md:writing-normal text-base">
                      <span
                        className="block md:hidden"
                        style={{
                          writingMode: "vertical-rl",
                          textOrientation: "mixed",
                        }}
                      >
                        {slot.time}
                      </span>
                      <span className="hidden md:block">{slot.time}</span>
                    </span>
                  </td>
                  {/* Wave Height */}
                  <td className={waveHeightBgClass}>
                    <span className="font-bold text-xl mr-2">
                      {waveHeight.toFixed(1)}
                      <span className="text-base font-normal ml-1">
                        {unitLabel}
                      </span>
                    </span>
                  </td>
                  {/* Wave Quality Rating and wave direction + period */}
                  <td>
                    <div className="flex flex-col gap-y-2 justify-between">
                      <div className="block md:hidden">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xl">
                            {wavePeriod}
                            <span className="text-base font-normal ml-1">
                              s
                            </span>
                          </span>
                          <span className="flex items-center">
                            {waveDirection !== undefined &&
                            waveDirection !== null ? (
                              <ArrowUpRight
                                size={28}
                                className="text-gray-700"
                                style={{
                                  transform: `rotate(${
                                    waveDirection + 180
                                  }deg)`,
                                }}
                              />
                            ) : (
                              <span className="text-gray-400 text-xl">—</span>
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="rating rating-sm">
                        {starRatings.map((n) => (
                          <div
                            key={n}
                            className="mask mask-star bg-blue-400"
                            aria-label={`${n} star`}
                            aria-current={
                              waveQualityRating >= n ? "true" : undefined
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </td>
                  {/* Wave Direction and Period */}
                  <td className="hidden md:block">
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-bold text-xl mr-2">
                        {wavePeriod}
                        <span className="text-base font-normal ml-1">s</span>
                      </span>
                      <span className="ml-2 flex items-center">
                        {waveDirection !== undefined &&
                        waveDirection !== null ? (
                          <ArrowUpRight
                            size={28}
                            className="text-gray-700"
                            style={{
                              transform: `rotate(${waveDirection + 180}deg)`,
                            }}
                          />
                        ) : (
                          <span className="text-gray-400 text-xl">—</span>
                        )}
                      </span>
                    </div>
                  </td>

                  {/* Wind */}
                  <td className={`${windBgClass}`}>
                    <div
                      className={`flex flex-col md:flex-row justify-center items-center gap-2 px-2 py-1`}
                    >
                      <div className="flex items-baseline gap-2">
                        {/* Wind speed unit */}
                        <span className="text-lg font-normal">
                          {windSpeed !== undefined &&
                          windSpeed !== null &&
                          !isNaN(Number(windSpeed))
                            ? "kph"
                            : ""}
                        </span>
                        {/* Wind speed */}
                        <span className="font-bold text-2xl">
                          {getWindSpeedKph(windSpeed)}
                        </span>
                      </div>

                      {/* Wind direction arrow */}
                      <ArrowUpRight
                        size={28}
                        style={{
                          transform: `rotate(${waveDirection + 180}deg)`,
                        }}
                      />
                    </div>
                  </td>
                  {/* Weather */}
                  <td className="hidden md:block">
                    <div className="flex justify-center items-center gap-2">
                      <span className="text-2xl font-bold">
                        {temperature}°{tempUnit}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DayForecastDetailsV2;
