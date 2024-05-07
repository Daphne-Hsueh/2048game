import React, { useContext, useEffect, useCallback } from "react";
// import { TilesContext } from "./TilesContext";
import { shallowEqual, useSelector } from "react-redux";

import { GameLogic } from "./GameLogic";

const Board = () => {
  const board = useSelector((state) => state.board.board, shallowEqual);

  useEffect(() => {
    console.log("debug board", board);
  }, [board]);
  // const { tiles, setTiles } = useContext(TilesContext)
  const { nextTile, slideLeft, slideRight, slideUp, slideDown } = GameLogic();

  const handleKeyUp = useCallback(
    (e) => {
      if (e.keyCode === 38) {
        slideUp();
      } else if (e.keyCode === 40) {
        slideDown();
      } else if (e.keyCode === 39) {
        slideRight();
      } else if (e.keyCode === 37) {
        slideLeft();
      } else return;

      nextTile();
    },
    [nextTile, slideUp, slideDown, slideLeft, slideRight]
  );

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyUp]);

  return (
    <div className="board">
      {Array.isArray(board) &&
        board.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {Array.isArray(row) &&
              row.map((tile, tileIndex) => (
                <div key={tileIndex} className={`tile x${tile}`}>
                  {tile !== 0 && tile}
                </div>
              ))}
          </div>
        ))}
    </div>
  );
};

export default Board;
