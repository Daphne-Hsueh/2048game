import { useContext, useEffect } from "react";
import { TilesContext } from "./TilesContext";
import { useSelector, useDispatch } from "react-redux";
import { incrementScore, setBestScore } from "../features/scoreSlice";
import { resetBoard, setBoard } from "../features/boardSlice";

export const GameLogic = () => {
  const rows = 4;
  const columns = 4;
  // const { tiles, setTiles } = useContext(TilesContext)

  const dispatch = useDispatch();
  const score = useSelector((state) => state.score.score);
  const bestScore = useSelector((state) => state.score.bestScore);
  const board = useSelector((state) => state.board.board);

  const getNextTileNumber = () => {
    const random = Math.random();
    return random < 0.85 ? 2 : 4;
  };

  const filterZero = (row) => {
    return row.filter((num) => num !== 0);
  };

  const slide = (row) => {
    row = filterZero(row);
    for (let i = 0; i < row.length - 1; i++) {
      if (row[i] === row[i + 1]) {
        row[i] *= 2;
        row[i + 1] = 0;
        dispatch(incrementScore(row[i]));
      }
    }
    row = filterZero(row);

    while (row.length < columns) {
      row.push(0);
    }
    return row;
  };

  const slideLeft = () => {
    let newTiles = JSON.parse(JSON.stringify(board));
    let newBoard;
    for (let r = 0; r < rows; r++) {
      let row = newTiles[r];
      row = slide(row);
      newTiles[r] = row;
      for (let c = 0; c < columns; c++) {
        newBoard = JSON.parse(JSON.stringify(newTiles));
        let tile = newBoard[r][c];
        newBoard[r][c] = tile;
      }
    }
    console.log("newBoard after", newBoard);
    dispatch(setBoard(newBoard));
  };

  const slideRight = () => {
    // for (let r = 0; r < rows; r++) {
    //   let row = tiles[r];
    //   row.reverse();
    //   row = slide(row);
    //   tiles[r] = row.reverse();
    //   for (let c = 0; c < columns; c++) {
    //     let newBoard = [...tiles];
    //     let tile = newBoard[r][c];
    //     newBoard[r][c] = tile;
    //     // setTiles(...newBoard, tile);
    //     dispatch(setTiles(newBoard));
    //   }
    // }
    let newBoard = JSON.parse(JSON.stringify(board)); // create a deep copy of tiles
    for (let r = 0; r < rows; r++) {
      let row = newBoard[r]; // work with the row in newBoard
      row.reverse();
      row = slide(row);
      newBoard[r] = row.reverse();
    }
    // dispatch(setTiles(newBoard)); // dispatch the new board state
    dispatch(setBoard(newBoard));
  };

  const slideUp = () => {
    // for (let c = 0; c < columns; c++) {
    //   let row = [tiles[0][c], tiles[1][c], tiles[2][c], tiles[3][c]];
    //   row = slide(row);
    //   for (let r = 0; r < rows; r++) {
    //     let newBoard = [...tiles];
    //     tiles[r][c] = row[r];
    //     let tile = newBoard[r][c];
    //     newBoard[r][c] = tile;
    //     // setTiles(...newBoard, tile);
    //     dispatch(setTiles(newBoard));
    //   }
    // }
    let newBoard = JSON.parse(JSON.stringify(board)); // create a deep copy of tiles
    for (let c = 0; c < columns; c++) {
      let col = [
        newBoard[0][c],
        newBoard[1][c],
        newBoard[2][c],
        newBoard[3][c],
      ];
      col = slide(col);
      for (let r = 0; r < rows; r++) {
        newBoard[r][c] = col[r];
      }
    }
    // dispatch(setTiles(newBoard)); // dispatch the new board state
    dispatch(setBoard(newBoard));
  };

  function slideDown() {
    // for (let c = 0; c < columns; c++) {
    //   let row = [tiles[0][c], tiles[1][c], tiles[2][c], tiles[3][c]];
    //   row.reverse();
    //   row = slide(row);
    //   row.reverse();
    //   for (let r = 0; r < rows; r++) {
    //     let newBoard = [...tiles];
    //     tiles[r][c] = row[r];
    //     let tile = newBoard[r][c];
    //     newBoard[r][c] = tile;
    //     // setTiles(...newBoard, tile);
    //     dispatch(setTiles(newBoard));
    //   }
    // }
    let newBoard = JSON.parse(JSON.stringify(board)); // create a deep copy of tiles
    for (let c = 0; c < columns; c++) {
      let col = [
        newBoard[0][c],
        newBoard[1][c],
        newBoard[2][c],
        newBoard[3][c],
      ];
      col.reverse();
      col = slide(col);
      col.reverse();
      for (let r = 0; r < rows; r++) {
        newBoard[r][c] = col[r];
      }
    }
    // dispatch(setTiles(newBoard)); // dispatch the new board state
    dispatch(setBoard(newBoard));
  }

  const nextTile = () => {
    if (!hasEmptyTile()) {
      if (hasBeatBest()) alert(" you've beaten your best score!!");
      else alert("GAME OVER");
      dispatch(resetBoard());
      return;
    }
    let found = false;
    while (!found) {
      let r = Math.floor(Math.random() * rows);
      let c = Math.floor(Math.random() * columns);
      if (board[r][c] === 0) {
        let newBoard = JSON.parse(JSON.stringify(board));
        newBoard[r][c] = getNextTileNumber();
        dispatch(setBoard(newBoard));
        found = true;
      }
    }
  };

  const hasBeatBest = () => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem("bestScore", score);
      return true;
    }
    return false;
  };

  const hasEmptyTile = () => {
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        if (board[r][c] === 0) {
          return true;
        }
      }
    }
    return false;
  };

  return { nextTile, slideLeft, slideRight, slideUp, slideDown };
};
