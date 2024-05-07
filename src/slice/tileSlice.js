import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  board: 
  [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]
};

export const tileSlice = createSlice({
  name: 'tile',
  initialState,

  reducers: {
    setTile: (state, action) => {
      state.board= action.payload;
    },
    resetTile: (state) => {
      state.board = initialState.board;
    },

  },
});


export const { setTile,resetTile } = tileSlice.actions;

export default tileSlice.reducer;