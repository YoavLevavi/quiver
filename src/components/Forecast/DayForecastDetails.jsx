import React, { useState, useRef, useLayoutEffect, useMemo } from "react";
import { ArrowUpRight } from "lucide-react";

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
      style={{ userSelect: "none" }} // Prevents text selection on click
    >
      <h3 className="font-bold text-lg mb-4 text-right">{date}</h3>
      <div
        // This div handles the animation
        style={{
          maxHeight,
          transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)", // Smooth easing
          overflow: "hidden", // Crucial for max-height animation
        }}
      >
        <table ref={tableRef} className="w-full text-right">
          <thead>
            <tr className="border-b">
              <th className="p-2">שעה</th>
              <th className="p-2">טמפ' (°C)</th>
              <th className="p-2">גובה גל {unit === "m" ? "(מ')" : "(פיט)"}</th>
              <th className="p-2">פריוד (שניות)</th>
              <th className="p-2">רוח (קמ"ש)</th>
              <th className="p-2">כיוון רוח</th>
              <th className="p-2">כיוון גל</th>
            </tr>
          </thead>
          <tbody>
            {rowsToShow.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center text-gray-400 p-4">
                  אין נתונים זמינים לשעות אלו
                </td>
              </tr>
            ) : (
              rowsToShow.map((slot) => (
                <tr key={slot.time} className="border-b hover:bg-gray-50">
                  <td className="p-2 font-bold">
                    {!expanded && HOUR_TO_LABEL[slot.time]
                      ? HOUR_TO_LABEL[slot.time]
                      : slot.time}
                  </td>
                  <td className="p-2">{slot.airTemp ?? "—"}</td>
                  <td className="p-2">{slot.waveHeight ?? "—"}</td>
                  <td className="p-2">{slot.period ?? "—"}</td>
                  <td className="p-2">{slot.windSpeed ?? "—"}</td>
                  <td className="p-2">
                    {slot.windDirection !== undefined &&
                    slot.windDirection !== null ? (
                      <span
                        className="inline-block"
                        style={{
                          transform: `rotate(${slot.windDirection + 180}deg)`,
                        }}
                        title={`כיוון רוח ${slot.windDirection}°`}
                      >
                        <ArrowUpRight size={18} />
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="p-2">
                    {slot.waveDirection !== undefined &&
                    slot.waveDirection !== null ? (
                      <span
                        className="inline-block"
                        style={{
                          transform: `rotate(${slot.waveDirection + 180}deg)`,
                        }}
                        title={`כיוון גל ${slot.waveDirection}°`}
                      >
                        <ArrowUpRight size={18} />
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="text-center text-xs text-gray-400 mt-2 select-none">
        {expanded ? "לחץ כדי להסתיר שעות" : "לחץ כדי להציג את כל השעות"}
      </div>
    </div>
  );
}

export default DayForecastDetails;
