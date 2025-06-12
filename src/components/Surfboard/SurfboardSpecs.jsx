import React from "react";
import { Box, Layers, Ruler, Swords } from "lucide-react";
import InfoCardSurfboard from "./InfoCardSurfboard";

function SurfboardSpecs({ surfboard }) {
  if (!surfboard) return null;

  const specs = [
    surfboard.size && {
      icon: <Ruler />,
      label: "גובה",
      value: surfboard.size + "'",
    },
    surfboard.volume && {
      icon: <Box />,
      label: "נפח",
      value: surfboard.volume + "L",
    },
    surfboard.finSystem && {
      icon: <Swords />,
      label: "חרבות",
      value: surfboard.finSystem,
    },
    surfboard.technology && {
      icon: <Layers />,
      label: "טכנולוגיה",
      value: surfboard.technology,
    },
  ].filter(Boolean);

  if (specs.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-4">
      {specs.map((spec) => (
        <InfoCardSurfboard
          key={spec.label}
          icon={spec.icon}
          label={spec.label}
          value={spec.value}
        />
      ))}
    </div>
  );
}

export default SurfboardSpecs;
