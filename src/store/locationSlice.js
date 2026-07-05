import { createSlice } from "@reduxjs/toolkit";

const saved = JSON.parse(localStorage.getItem("location"));

const locationSlice = createSlice({
  name: "location",
  initialState: {
    lat: saved?.lat ?? 19.002,
    lng: saved?.lng ?? 73.1283446,
    description: saved?.description ?? "",
    viewport: saved?.viewport ?? null,
  },
  reducers: {
    setLocation: (state, action) => {
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
      state.description = action.payload.description;
      state.viewport = action.payload.viewport || null;
      localStorage.setItem("location", JSON.stringify(state));
    },
  },
});

export const { setLocation } = locationSlice.actions;
export default locationSlice.reducer;
