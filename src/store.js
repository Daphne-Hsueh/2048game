// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import scoreReducer from "./slice/scoreSlice";
import tileReducer from "./slice/tileSlice";

export const store = configureStore({
  reducer: {
    score: scoreReducer,
    tile: tileReducer,
  },
});
