// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import scoreReducer from "./features/scoreSlice";
import boardReducer from "./features/boardSlice";

export const store = configureStore({
  reducer: {
    score: scoreReducer,
    board: boardReducer,
  },
});
