import React from "react";
import { Sun, Cloud, Umbrella } from "lucide-react";

const weatherIcons = {
  sunny: (props) =>
    React.createElement(Sun, {
      size: 18,
      className: "text-yellow-400",
      ...props,
    }),
  cloudy: (props) =>
    React.createElement(Cloud, {
      size: 18,
      className: "text-gray-500",
      ...props,
    }),
  rainy: (props) =>
    React.createElement(Umbrella, {
      size: 18,
      className: "text-blue-500",
      ...props,
    }),
};

export const getWeatherIcon = (type, props = {}) => {
  const Icon = weatherIcons[type];
  return Icon ? Icon(props) : "—";
};
