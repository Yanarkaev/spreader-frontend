import axios from "axios";
const {NODE_ENV} = process.env

export const apiInstance = axios.create({
  baseURL: NODE_ENV === "development" ? "http://localhost:3001/" : "https://spreader-backend.onrender.com/",
});
