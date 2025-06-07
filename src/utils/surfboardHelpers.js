/**
 * Returns a Hebrew label for a given surfboard condition.
 *
 * @param {string} condition - The condition of the surfboard ("new", "liked new", "used", or any other string).
 * @returns {string} The Hebrew label corresponding to the condition.
 */
export const getConditionLabel = (condition) => {
  switch (condition) {
    case "new":
      return "חדש";
    case "liked new":
      return "כמו חדש";
    case "used":
      return "משומש";
    default:
      return "לא ידוע";
  }
};

export const CATEGORIES = [
  { value: "", label: "בחר קטגוריה" },
  { value: "shortboard", label: "שורטבורד" },
  { value: "longboard", label: "לונגבורד" },
  { value: "funboard", label: "פאנבורד" },
  { value: "fish", label: "פיש" },
];
