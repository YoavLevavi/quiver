import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine,
  Tooltip,
  ReferenceArea,
} from "recharts";
import { toFeet } from "../../utils/conversions";
import useResponsivePadding from "../../hooks/useResponsivePadding";

/**
 * ForecastChart component renders a responsive bar chart displaying wave height forecasts for multiple days.
 * It normalizes wave heights, groups data by day, and highlights Saturdays with a background area.
 * The chart displays day labels, dates, and min-max wave height ranges for each day.
 *
 * @component
 * @param {Object[]} forecastData - Array of forecast day objects, each containing a date, label, and slots.
 * @param {string} forecastData[].date - The date string for the forecast day.
 * @param {string} forecastData[].label - The label for the forecast day (e.g., "היום").
 * @param {Object[]} forecastData[].slots - Array of time slot objects for the day.
 * @param {string} forecastData[].slots[].time - The time of the slot (e.g., "08:00").
 * @param {number} forecastData[].slots[].waveHeight - The wave height value for the slot (in meters).
 * @param {"m"|"ft"} unit - The unit for displaying wave heights ("m" for meters, "ft" for feet).
 * @returns {JSX.Element|null} The rendered bar chart or null if no data is provided.
 */
const ForecastChart = ({ forecastData, unit }) => {
  const xAxisPadding = useResponsivePadding();
  if (!forecastData || forecastData.length === 0) return null;

  const chartData = [];
  const dayMarkers = [];

  // Calculate the global maximum wave height for normalization
  let globalMax = 0;

  forecastData.forEach((day) => {
    const relevantSlots = day.slots.filter((slot) =>
      ["08:00", "12:00", "18:00"].includes(slot.time)
    );
    relevantSlots.forEach((slot) => {
      const value = unit === "m" ? slot.waveHeight : toFeet(slot.waveHeight);
      if (value > globalMax) globalMax = value;
    });
  });

  forecastData.forEach((day, i) => {
    const startIndex = chartData.length;
    const requiredTimes = ["08:00", "12:00", "18:00"];
    const daySlots = day.slots.filter((slot) =>
      requiredTimes.includes(slot.time)
    );

    if (daySlots.length < 3) {
      console.log(`Skipping day: ${day.label} (missing slots)`);
      return;
    }

    daySlots.forEach((slot, j) => {
      const rawHeight =
        unit === "m"
          ? parseFloat(slot.waveHeight.toFixed(1))
          : parseFloat(toFeet(slot.waveHeight).toFixed(1));

      const normalizedHeight = parseFloat(
        ((rawHeight / globalMax) * 10).toFixed(2) - 3
      );

      chartData.push({
        x: startIndex + j,
        time: slot.time,
        wave: normalizedHeight, // נורמליזציה לצורך גובה
        displayWave: rawHeight, // להצגה בלבד
        dayMarkerRef: null,
      });
    });

    const labelIndex = startIndex + 1;

    const min =
      unit === "m"
        ? Math.min(...daySlots.map((s) => s.waveHeight)).toFixed(1)
        : Math.min(...daySlots.map((s) => toFeet(s.waveHeight)))
            .toString()
            .split(".")[0];

    const max =
      unit === "m"
        ? Math.max(...daySlots.map((s) => s.waveHeight)).toFixed(1)
        : Math.max(...daySlots.map((s) => toFeet(s.waveHeight)))
            .toString()
            .split(".")[0];

    const dateObj = new Date(day.date);
    const dayLabel =
      i === 0
        ? "היום"
        : dateObj
            .toLocaleDateString("he-IL", { weekday: "long" })
            .split(" ")[1];

    const dateLabel = dateObj.toLocaleDateString("he-IL", {
      day: "2-digit",
      month: "2-digit",
    });

    const marker = {
      startIndex,
      endIndex: startIndex + 2,
      labelIndex,
      label: dayLabel,
      date: dateLabel,
      rangeLabel: `${min}-${max} ${unit === "m" ? "מ'" : "פ'"}`,
    };

    for (let k = startIndex; k <= startIndex + 2; k++) {
      chartData[k].dayMarkerRef = marker;
    }

    dayMarkers.push(marker);
  });

  // Use responsive padding hook to adjust padding based on screen size.
  return (
    <div dir="rtl">
      <ResponsiveContainer height={300}>
        <BarChart
          data={chartData}
          barGap={0}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          barCategoryGap="10%"
          style={{ transform: "scaleX(-1)" }}
        >
          <YAxis domain={[0, 10]} hide />

          {dayMarkers.map((marker, index) => {
            const isSaturday = marker.label.includes("שבת");
            if (!isSaturday) return null;
            return (
              <ReferenceArea
                key={`saturday-area-${index}`}
                x1={marker.startIndex - 0.5}
                x2={marker.endIndex + 0.5}
                stroke="none"
                fill="#f3f4f6"
                fillOpacity={0.8}
              />
            );
          })}

          <XAxis
            dataKey="x"
            type="number"
            padding={xAxisPadding}
            tickCount={chartData.length}
            tickLine={false}
            axisLine={true}
            height={80}
            interval={0}
            tick={({ x, y, payload }) => {
              const fullData = chartData.find((d) => d.x === payload.value);
              const marker = fullData?.dayMarkerRef;
              const isMobile = window.innerWidth < 650; // פחות מ-sm
              const isMeters = unit === "m";

              return (
                <g transform={`translate(${x}, ${y}) scale(-1, 1)`}>
                  {marker && payload.value === marker.labelIndex && (
                    <>
                      {/* היום */}
                      <text
                        x={0}
                        y={-200}
                        textAnchor="middle"
                        fill="#1f2937"
                        fontSize={16}
                        fontWeight={700}
                      >
                        {marker.label}
                      </text>

                      {/* תאריך */}
                      <text
                        x={0}
                        y={-180}
                        textAnchor="middle"
                        fill="#6b7280"
                        fontSize={14}
                        fontWeight={500}
                      >
                        {marker.date}
                      </text>

                      {/* טווח גובה */}
                      <text
                        x={0}
                        y={0}
                        dy={20}
                        textAnchor="middle"
                        fill="#1f2937"
                        fontSize={isMobile ? 12 : 16}
                        fontWeight={600}
                      >
                        {isMeters && isMobile ? (
                          <>
                            <tspan x={0} dy="20" fontSize={12}>
                              {marker.rangeLabel.split(" ")[0]}
                            </tspan>
                          </>
                        ) : (
                          marker.rangeLabel
                        )}
                      </text>
                    </>
                  )}
                </g>
              );
            }}
          />

          {dayMarkers.map((marker, index) => {
            const lastBar = chartData.find((d, i) => i === marker.endIndex);
            if (!lastBar) return null;

            return (
              <ReferenceLine
                key={`group-divider-${index}`}
                x={lastBar.x + 0.5}
                stroke="#9ca3af"
                strokeWidth={1}
              />
            );
          })}

          <Bar dataKey="wave" fill="#38bdf8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ForecastChart;
