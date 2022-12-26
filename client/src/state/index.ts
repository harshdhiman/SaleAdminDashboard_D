import { createSlice } from "@reduxjs/toolkit";

const globalState = createSlice({
  name: "global",
  initialState: {
    mode: "dark" as "light" | "dark",
    userId: "63701cc1f03239b7f700000e",
  },
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { setMode } = globalState.actions;

export const globalReducer = globalState.reducer;
