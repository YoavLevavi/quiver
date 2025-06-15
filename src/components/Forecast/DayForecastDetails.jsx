import React, { useState, useRef, useLayoutEffect, useMemo } from "react";
import { ArrowUpRight } from "lucide-react";
import Title3 from "../Text/Title3";
import TextSmall from "../Text/TextSmall";
import TextBody from "../Text/TextBody";
import TextLarge from "../Text/TextLarge";

// Moved static configurations outside the component for clarity and performance
const HOUR_TO_LABEL = {
  "08:00": "בוקר",
  "14:00": "צהריים",
  "20:00": "ערב",
};
const COLLAPSED_HOURS = ["08:00", "14:00", "20:00"];

function DayForecastDetails({ date, slots, unit = "m" }) {
  // מיפוי שמות השדות מה-API לשמות נוחים לשימוש בקומפוננטה
  const normalizedSlots = useMemo(() => {
    const arr = slots.map((slot) => ({
      ...slot,
      airTemp: slot.air_temperature ?? slot.airTemp ?? slot.temp ?? null,
      waveHeight: slot.wave_height ?? slot.waveHeight ?? null,
      period: slot.wave_period ?? slot.period ?? null,
      waveDirection: slot.wave_direction ?? slot.waveDirection ?? null,
      windSpeed: slot.wind_speed ?? slot.windSpeed ?? null,
      windDirection: slot.wind_direction ?? slot.windDirection ?? null,
    }));

    return arr;
  }, [slots]);

  const [expanded, setExpanded] = useState(false);
  const tableRef = useRef(null); // Ref for the table element to get its scrollHeight
  const [maxHeight, setMaxHeight] = useState("0px"); // Start with "0px" for initial reveal animation

  // Memoize filteredSlots to recompute only when slots prop changes
  const filteredSlots = useMemo(() => {
    return normalizedSlots.filter((slot) => {
      const hour = Number(slot.time.split(":")[0]);
      return hour >= 6 && hour <= 22 && hour % 2 === 0;
    });
  }, [normalizedSlots]);

  // Memoize rowsToShow to recompute only when expanded or filteredSlots change
  const rowsToShow = useMemo(() => {
    return expanded
      ? filteredSlots
      : filteredSlots.filter((slot) => COLLAPSED_HOURS.includes(slot.time));
  }, [expanded, filteredSlots]);

  // Effect to update maxHeight for animation when rowsToShow changes
  useLayoutEffect(() => {
    if (tableRef.current) {
      // Set maxHeight to the actual scrollHeight of the table content.
      // This will be the height of the table with either collapsed or expanded rows.
      setMaxHeight(`${tableRef.current.scrollHeight}px`);
    }
    // If tableRef.current is null (e.g., component unmounted during async op),
    // we don't update maxHeight. This state should be rare.
  }, [rowsToShow]); // Re-run when the content to display (rowsToShow) changes

  // Helper to convert wind speed to kph if needed
  function getWindSpeedKph(windSpeed) {
    if (
      windSpeed === null ||
      windSpeed === undefined ||
      isNaN(Number(windSpeed))
    )
      return "—";
    return Math.round(Number(windSpeed)); // Already in kph from Open-Meteo
  }

  return (
    <div
      className="overflow-x-auto rounded-xl bg-white shadow p-4 my-4 transition-all duration-200 cursor-pointer hover:ring-2 hover:ring-primary/40"
      title={expanded ? "הסתר שעות" : "הצג את כל השעות"}
      onClick={() => setExpanded((prev) => !prev)}
      tabIndex={0}
      role="button"
      onKeyDown={(e) =>
        (e.key === "Enter" || e.key === " ") && setExpanded((prev) => !prev)
      }
      style={{ userSelect: "none" }}
    >
      <Title3 className="mb-4 text-right">{date}</Title3>
      <div
        style={{
          maxHeight,
          transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          overflow: "hidden",
        }}
      >
        <table ref={tableRef} className="w-full text-center">
          <thead className="hidden sm:table-header-group">
            <tr className="border-b">
              <th className="p-2">
                <TextSmall bold>שעה</TextSmall>
              </th>
              <th className="p-2" colSpan={2}>
                <TextSmall bold>סוול</TextSmall>
              </th>
              <th className="p-2">
                <TextSmall bold>רוח</TextSmall>
              </th>
              <th className="p-2">
                <TextSmall bold>טמפ' (°C)</TextSmall>
              </th>
            </tr>
          </thead>
          <tbody>
            {rowsToShow.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-gray-400 p-4">
                  <TextSmall variant="onLight">
                    אין נתונים זמינים לשעות אלו
                  </TextSmall>
                </td>
              </tr>
            ) : (
              rowsToShow.map((slot) => (
                <tr
                  key={slot.time}
                  className="border-b hover:bg-gray-50 transition group sm:table-row flex flex-row sm:flex-row w-full"
                >
                  {/* Hour – vertical on mobile, top→bottom */}
                  <td
                    className=" p-2 font-bold align-middle flex justify-center items-center sm:table-cell
    [writing-mode:vertical-lr]       
    [text-orientation:mixed]         
    sm:[writing-mode:unset] sm:[text-orientation:unset]
    h-16 min-w-6
  "
                  >
                    <span>
                      {!expanded && HOUR_TO_LABEL[slot.time]
                        ? HOUR_TO_LABEL[slot.time]
                        : slot.time}
                    </span>
                  </td>

                  {/* Wave - first two columns on mobile, first column on desktop */}
                  <td
                    className="p-2 align-middle flex-1 sm:table-cell"
                    colSpan={2}
                  >
                    <div className="flex items-center justify-center gap-4">
                      <div className="rounded-md bg-primary-content 0 flex items-center px-4 py-2 min-w-[90px]">
                        <span className="font-bold text-xl mr-2">
                          {slot.waveHeight ?? "—"}
                          <span className="text-base font-normal ml-1">
                            {unit === "m" ? "m" : "ft"}
                          </span>
                        </span>
                        <span className="font-bold text-xl mr-2">
                          {slot.period ?? "—"}
                          <span className="text-base font-normal ml-1">s</span>
                        </span>
                        <span className="ml-2 flex items-center">
                          {slot.waveDirection !== undefined &&
                          slot.waveDirection !== null ? (
                            <ArrowUpRight
                              size={28}
                              className="text-gray-700"
                              style={{
                                transform: `rotate(${
                                  slot.waveDirection + 180
                                }deg)`,
                              }}
                            />
                          ) : (
                            <span className="text-gray-400 text-xl">—</span>
                          )}
                        </span>
                      </div>
                    </div>
                  </td>
                  {/* Wind */}
                  <td className="p-2 align-middle flex-1 sm:table-cell">
                    <div className="flex items-center justify-center gap-3">
                      <div className="flex flex-col items-end">
                        <span className="font-bold text-2xl leading-tight">
                          {getWindSpeedKph(slot.windSpeed)}
                        </span>
                        <span className="text-xs text-gray-400 -mt-1">
                          {slot.windSpeed !== undefined &&
                          slot.windSpeed !== null &&
                          !isNaN(Number(slot.windSpeed))
                            ? "קמ״ש"
                            : ""}
                        </span>
                      </div>
                      <span className="inline-flex items-center justify-center rounded-md bg-gray-100 w-12 h-12 ml-2">
                        {slot.windDirection !== undefined &&
                        slot.windDirection !== null ? (
                          <ArrowUpRight
                            size={28}
                            className="text-gray-700"
                            style={{
                              transform: `rotate(${
                                slot.windDirection + 180
                              }deg)`,
                            }}
                          />
                        ) : (
                          <span className="text-gray-400 text-xl">—</span>
                        )}
                      </span>
                    </div>
                  </td>
                  {/* Temp - last on mobile, hidden on mobile */}
                  <td className="p-2 align-middle flex-1 sm:table-cell hidden sm:table-cell">
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-lg">
                        {slot.airTemp ?? "—"}
                      </span>
                      <span className="text-xs text-gray-400">°C</span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <TextSmall
        className="text-center text-gray-400 mt-2 select-none"
        variant="onLight"
      >
        {expanded ? "לחץ כדי להסתיר שעות" : "לחץ כדי להציג את כל השעות"}
      </TextSmall>
    </div>
  );
}

export default DayForecastDetails;
