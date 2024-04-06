import React, {useContext , useEffect,useState} from "react";
import { TilesContext } from "./TilesContext";
import { ScoreContext } from './ScoreContext';
import { GameLogic } from "./GameLogic";


const Header = () => {

  const { tiles, setTiles} = useContext(TilesContext)
  const {score , bestScore} = useContext(ScoreContext)
  const {nextTile } = GameLogic ()
  const [newGameStarted, setNewGameStarted] = useState(false);
  
  
  useEffect(() => {

    if (newGameStarted) {
      nextTile();
      nextTile();
      setNewGameStarted(false);
    }
  }, [tiles, newGameStarted, nextTile]);

  const newGame = () => {
    const board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]
    setTiles(board);
    setNewGameStarted(true);
    console.log('NEW GAME START');
  };
  




  return (
    <div className="header">
      <div className="title">
        <h1>2048</h1>
        <h6>Join the tiles, get to <b>2048</b>!</h6>
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
        <button className="new-game" 
          onClick={newGame}
          >New Game</button>
      </div>
   </div>
  )
}

export default Header