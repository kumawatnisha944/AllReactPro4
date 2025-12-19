
export const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:9000"
    : "https://food-backend.onrender.com";
