import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../client";

const mapApiError = (error) => {
  if (error.code === "ECONNABORTED") {
    return "Request timed out. Please try again.";
  }

  if (error.response?.status === 404) {
    return "City not found. Try another city name.";
  }

  if (error.response?.status === 400) {
    return error.response?.data?.message || "Invalid request. Check your input.";
  }

  if (error.response?.status === 429) {
    return "Too many requests. Please wait and try again.";
  }

  if (error.response?.status >= 500) {
    return "Weather service is unavailable right now. Please retry.";
  }

  if (error.message === "Network Error") {
    return "Network error. Check your internet connection.";
  }

  return error.response?.data?.message || "Something went wrong while fetching weather.";
};

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async ({ city, date }, { rejectWithValue }) => {
    try {
      let query = `?city=${encodeURIComponent(city)}`;
      if (date) query += `&date=${date}`;

      const response = await client.get(`/weather${query}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(mapApiError(error));
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    data: null,
    lastSuccessData: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearWeatherError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.lastSuccessData = action.payload;
        state.error = null;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load weather data.";
        state.data = state.lastSuccessData;
      });
  },
});

export const { clearWeatherError } = weatherSlice.actions;
export default weatherSlice.reducer;
