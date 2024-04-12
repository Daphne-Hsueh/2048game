// src/features/score/scoreSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const scoreSlice = createSlice({
  name: 'score',

  initialState: {
    bestScore: parseInt(localStorage.getItem('bestScore')) || 0,
    score: 0,
  },

  reducers: {
    setScore: (state, action) => {
      state.score = action.payload;

      if (action.payload > state.bestScore) {
        state.bestScore = action.payload;
        localStorage.setItem('bestScore', action.payload);
      }
    },

    incrementScore: (state, action) => {
      state.score += action.payload;
    },

    setBestScore: (state, action) => {
      state.bestScore = action.payload;
      localStorage.setItem('bestScore', action.payload);
    },

    resetScore: (state) => {
      state.score = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setScore, incrementScore, setBestScore, resetScore } = scoreSlice.actions;

export default scoreSlice.reducer;
