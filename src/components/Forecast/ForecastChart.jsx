import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Always show the wave height above the bar
const WaveLabel = ({ x, y, value, width }) => {
  if (!value) return null;

  return (
    <text
      x={x + width / 2}
      y={y - 10}
      textAnchor="middle"
      fill="#000"
      fontSize={12}
      fontWeight={500}
    >
      {value}
    </text>
  );
};

const ForecastChart = ({ data, unit }) => {
  if (!data || data.length === 0) return null;

  const maxY = unit === "ft" ? 10 : 6;
  const ticks =
    unit === "ft" ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] : [1, 2, 3, 4, 5, 6];

  const suffix = unit === "ft" ? "פיט" : "מ׳";

  const chartData = data
    .map((d) => {
      const date = new Date(d.day);
      if (isNaN(date)) return null;

      const weekday = date
        .toLocaleDateString("he-IL", { weekday: "short" })
        .replace("יום ", ""); // שבת
      const formattedDate = date
        .toLocaleDateString("he-IL", {
          day: "2-digit",
          month: "2-digit",
        })
        .replace(/\./g, "/"); // ensure slash instead of dot

      const height =
        unit === "ft"
          ? (parseFloat(d.wave) * 3.28084).toFixed(1)
          : parseFloat(d.wave).toFixed(1);

      return {
        day: `${weekday} ${formattedDate}`, // שבת 14/06
        wave: Number(height),
      };
    })
    .filter(Boolean);

  return (
    <div className="rounded-xl p-6 bg-[#f6f6f6]" dir="rtl">
      <div className="mb-3">
        <h3 className="text-xl font-bold text-right">תחזית גובה גלים</h3>
        <p className="text-sm text-gray-500 text-right">
          גובה יומי מקסימלי ({suffix})
        </p>
      </div>

      <ResponsiveContainer width="100%" height={240} >
        <BarChart data={[...chartData].reverse()} barCategoryGap="15%">
          <CartesianGrid
            stroke="#e5e7eb"
            strokeDasharray="3 3"
            vertical={false}
            horizontal={true}
          />
          <XAxis
            dataKey="day"
            tickFormatter={(value) => {
              const [weekday, date] = value.split(" ");
              return `${weekday}\n${date}`;
            }}
            tick={{
              fontSize: 12,
              textAnchor: "middle",
            }}
            interval={0}
            height={50}
          />
          <YAxis
            domain={[0, maxY]}
            ticks={ticks}
            interval={0} // Show all ticks
            orientation="right"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            width={30}
          />
          <Bar
            dataKey="wave"
            radius={[8, 8, 0, 0]}
            fill="#d1d5db"
            isAnimationActive={false}
          >
            <LabelList content={<WaveLabel />} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ForecastChart;
