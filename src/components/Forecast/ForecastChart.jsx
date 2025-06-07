import React from "react";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from "recharts";

// ✅ Custom Tooltip using DaisyUI styling
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-base-100 shadow rounded p-3 text-sm border border-base-300">
      <div className="font-semibold">{label}</div>
      <div className="text-info">
        גובה גלים: <span className="font-bold">{payload[0].value}</span>
      </div>
    </div>
  );
};

// Custom label to prevent disappearing labels at the top
const WaveLabel = (props) => {
  const { x, y, value, width } = props;
  // Adjust y to always be inside the chart area
  const safeY = Math.max(y - 8, 16); // 16px padding from top
  return (
    <text
      x={x + width / 2}
      y={safeY}
      textAnchor="middle"
      className="fill-foreground"
      fontSize={12}
      fontWeight={500}
      dominantBaseline="middle"
    >
      {value}
    </text>
  );
};

function ForecastChart({ data, unit }) {
  const chartData = data.map((d) => ({
    ...d,
    wave: unit === "ft" ? (d.wave * 3.28084).toFixed(2) : d.wave,
  }));

  const chartConfig = {
    wave: {
      label: unit === "ft" ? "גובה גלים מרבי (פיט)" : "גובה גלים מרבי (מ׳)",
      color: "var(--chart-1)",
    },
  };

  return (
    <div dir="rtl">
      <ChartContainer
        config={chartConfig}
        className="h-[600px] w-full overflow-x-auto"
      >
        <BarChart width={900} height={360} data={[...chartData].reverse()}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="day"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="wave" fill="var(--chart-1)" radius={4}>
            <LabelList dataKey="wave" content={<WaveLabel />} />
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
}

export default ForecastChart;
