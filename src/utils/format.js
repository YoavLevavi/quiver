export const formatPrice = (price) => `₪${price.toLocaleString("he-IL")}`;

export const formatDate = (timestamp) =>
  timestamp.toDate().toLocaleDateString("he-IL").replace(/\D/g, "/");
