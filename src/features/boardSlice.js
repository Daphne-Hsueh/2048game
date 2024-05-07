import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  board: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
};

export const boardSlice = createSlice({
  name: "board",
  initialState,

  reducers: {
    setBoard: (state, action) => {
      state.board = action.payload;
    },
    resetBoard: (state) => {
      state.board = initialState.board;
    },
  },
});

export const { resetBoard, setBoard } = boardSlice.actions;

export default boardSlice.reducer;
