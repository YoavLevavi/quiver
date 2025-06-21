export const formatPrice = (price) => `₪${price.toLocaleString("he-IL")}`;

export const formatDate = (timestamp) =>
  timestamp.toDate().toLocaleDateString("he-IL").replace(/\D/g, "/");

export const formatDayLabel = (date, isToday) => {
  if (isToday) return "היום";
  return new Date(date)
    .toLocaleDateString("he-IL", { weekday: "long" })
    .split(" ")[1];
};

export const formatDateLabel = (date) => {
  return new Date(date).toLocaleDateString("he-IL", {
    day: "2-digit",
    month: "2-digit",
  });
};

// Formats a date string to a Hebrew date format
// Example: "2023-10-01" -> "יום ראשון, 1/10"
export const formatHebrewDate = (dateStr) => {
  const date = new Date(dateStr);
  const daysOfWeek = [
    "יום ראשון",
    "יום שני",
    "יום שלישי",
    "יום רביעי",
    "יום חמישי",
    "יום שישי",
    "יום שבת",
  ];
  return `${daysOfWeek[date.getDay()]}, ${date.getDate()}/${
    date.getMonth() + 1
  }`;
};
