import axios from "axios";

const rawBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api";
const normalizedBaseUrl = rawBaseUrl.endsWith("/") ? rawBaseUrl.slice(0, -1) : rawBaseUrl;
const apiBaseUrl = normalizedBaseUrl.endsWith("/api")
  ? normalizedBaseUrl
  : `${normalizedBaseUrl}/api`;

const client = axios.create({
  baseURL: apiBaseUrl,
  timeout: 15000,
  withCredentials: true,
});

export default client;
