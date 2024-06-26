import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GameLogic } from "./GameLogic";
import { TilesContext } from "./TilesContext";

const Header = () => {
  const score = useSelector((state) => state.score.score);
  const bestScore = useSelector((state) => state.score.bestScore);
  const { tiles, setTiles } = useContext(TilesContext);

  const { nextTile } = GameLogic();
  const [newGameStarted, setNewGameStarted] = useState(false);
  const initialBoard = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  useEffect(() => {
    if (newGameStarted) {
      nextTile();
      nextTile();
      setNewGameStarted(false);
    }
  }, [tiles, newGameStarted, nextTile]);

  const newGame = () => {
    setTiles(initialBoard);
    setNewGameStarted(true);
    console.log("NEW GAME START");
  };

  return (
    <div className="header">
      <div className="title">
        <h1>2048</h1>
        <h6>
          Join the tiles, get to <b>2048</b>!
        </h6>
      </div>
      <div className="scores">
        <div className="score">
          <h4>Score</h4>
          <h2>{score}</h2>
        </div>
        <div className="score">
          <h4>Best</h4>
          <h2>{bestScore}</h2>
        </div>
        <button className="new-game" onClick={newGame}>
          New Game
        </button>
      </div>
    </div>
  );
};

export default Header;
