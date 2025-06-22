import DOMPurify from "dompurify";

export const formatPrice = (price) => {
  // Validate and sanitize price input
  const numPrice = parseFloat(price);
  if (isNaN(numPrice) || numPrice < 0) {
    return "₪0";
  }
  return `₪${numPrice.toLocaleString("he-IL")}`;
};

export const formatDate = (timestamp) => {
  // Validate timestamp input
  if (!timestamp || typeof timestamp.toDate !== "function") {
    return "תאריך לא זמין";
  }
  return timestamp.toDate().toLocaleDateString("he-IL").replace(/\D/g, "/");
};

export const formatDayLabel = (date, isToday) => {
  if (isToday) return "היום";

  // Validate date input
  const validDate = new Date(date);
  if (isNaN(validDate.getTime())) {
    return "תאריך לא תקין";
  }

  return validDate
    .toLocaleDateString("he-IL", { weekday: "long" })
    .split(" ")[1];
};

export const formatDateLabel = (date) => {
  // Validate date input
  const validDate = new Date(date);
  if (isNaN(validDate.getTime())) {
    return "תאריך לא תקין";
  }

  return validDate.toLocaleDateString("he-IL", {
    day: "2-digit",
    month: "2-digit",
  });
};

// Formats a date string to a Hebrew date format
// Example: "2023-10-01" -> "יום ראשון, 1/10"
export const formatHebrewDate = (dateStr) => {
  // Sanitize and validate date string input
  const sanitizedDateStr = DOMPurify.sanitize(String(dateStr));
  const date = new Date(sanitizedDateStr);

  if (isNaN(date.getTime())) {
    return "תאריך לא תקין";
  }

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
