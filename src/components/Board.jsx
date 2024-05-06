import React, { useContext,  useEffect , useCallback } from 'react';
import { TilesContext } from './TilesContext';
import { useSelector } from 'react-redux';

import { GameLogic } from './GameLogic';

const Board = () => {


  // const tiles = useSelector((state) => state.tile.board)
    const { tiles, setTiles } = useContext(TilesContext)
  const {nextTile , slideLeft , slideRight ,slideUp ,slideDown} = GameLogic ()
  const handleKeyUp = useCallback((e) => {

    if (e.keyCode === 38) { //up
      slideUp()
    } 
    else if(e.keyCode === 40){ //down
      slideDown()
    }
    else if (e.keyCode === 39) { //right
      slideRight()
    }
    else if (e.keyCode === 37) { //left
      slideLeft()
    }
    else return
    nextTile()

  }, [nextTile, slideUp,slideDown,slideLeft,slideRight]); 


  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyUp]); 


  return (
      <div className="board">
          {Array.isArray(tiles) && tiles.map((row, rowIndex) => (
              <div className='row' key={rowIndex}>
                   {Array.isArray(row) && row.map((tile, tileIndex) => (
                      <div key={tileIndex} className= {`tile x${tile}`} >
                          {tile !== 0 && tile}
                      </div>
                  ))}
              </div>
          ))}
      </div>
  );
}

export default Board