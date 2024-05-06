// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import scoreReducer from './features/scoreSlice'
import tileReducer from './features/tileSlice'

export const store = configureStore({
  reducer: {
    score: scoreReducer,
    tile: tileReducer,
  },
});
