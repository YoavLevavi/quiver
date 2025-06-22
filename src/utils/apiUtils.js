// Ensure HTTPS for all API calls
const apiBaseUrl = "https://api.your-quiver-site.com"; // Use HTTPS

export async function fetchData(endpoint) {
  const response = await fetch(`${apiBaseUrl}/${endpoint}`, {
    method: "GET",
    credentials: "include", // Ensure secure cookies
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}
