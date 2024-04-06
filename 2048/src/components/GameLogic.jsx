import  {  useContext  } from 'react';
import { TilesContext } from './TilesContext';
import { ScoreContext } from './ScoreContext';

export const GameLogic = () => {

  const rows = 4
  const columns = 4
  const { tiles, setTiles } = useContext(TilesContext)
  const {score, setScore , bestScore, setBestScore } = useContext(ScoreContext)
  const board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]

  
  
  const getNextTileNumber = () =>  {
    const random = Math.random();
    return random < 0.85 ? 2 : 4;
  }

  const  filterZero = (row) => {
    return row.filter(num => num !== 0); 
  }

  const slide = (row) => {

    row = filterZero(row); 
    for (let i = 0; i < row.length-1; i++){
      if (row[i] === row[i+1]) {
        row[i] *= 2;
        row[i+1] = 0;
        setScore(score + row[i])
      }
    } 
    row = filterZero(row); 

    while (row.length < columns) {
        row.push(0);
    } 
    return row;
  }
  


  const slideLeft = () => {
    for (let r = 0; r < rows; r++) {
        let row = tiles[r];
        row = slide(row);
        tiles[r] = row;
        for (let c = 0; c < columns; c++){
            let newBoard = [...tiles]; 
            let tile = newBoard[r][c];
            newBoard[r][c] = tile; 
            setTiles(...newBoard, tile);  
        }
    }
  }

  const slideRight = () => {
    for (let r = 0; r < rows; r++) {
        let row = tiles[r];         
        row.reverse();              
        row = slide(row)           
        tiles[r] = row.reverse();   
        for (let c = 0; c < columns; c++){
           let newBoard = [...tiles]; 
            let tile = newBoard[r][c];
            newBoard[r][c] = tile; 
            setTiles(...newBoard, tile);  
        }
    }
  }


  const slideUp = () => {
    for (let c = 0; c < columns; c++) {
      let row = [tiles[0][c], tiles[1][c], tiles[2][c], tiles[3][c]];
      row = slide(row);
      for (let r = 0; r < rows; r++){
        let newBoard = [...tiles]; 
        tiles[r][c] = row[r];
        let tile = newBoard[r][c];
        newBoard[r][c] = tile; 
        setTiles(...newBoard, tile);  
      }
    }
  }

  function slideDown() {
    for (let c = 0; c < columns; c++) {
      let row = [tiles[0][c], tiles[1][c], tiles[2][c], tiles[3][c]];
      row.reverse();
      row = slide(row);
      row.reverse();
      for (let r = 0; r < rows; r++){
        let newBoard = [...tiles]; 
        tiles[r][c] = row[r];
        let tile = newBoard[r][c];
        newBoard[r][c] = tile; 
        setTiles(...newBoard, tile);  
      }
    }
  }

  const nextTile = () => {
    if (!hasEmptyTile()) {
      if (hasBeatBest()) alert(" you've beaten your best score!!")
      else alert ('GAME OVER')
      setTiles(board);
      return;
    }
    let found = false;
    while (!found) {
      let r = Math.floor(Math.random() * rows);
      let c = Math.floor(Math.random() * columns);
      if (tiles[r][c] === 0) {
        let newBoard = [...tiles]; 
        newBoard[r][c] = getNextTileNumber(); 
        setTiles(newBoard); 
          found = true;
      }
    }
  }

  const hasBeatBest = () => {
    if(score > bestScore) {
      setBestScore(score)
      localStorage.setItem('bestScore', score)
      return true
    }
    return false
  }




  const hasEmptyTile = () => {
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        if (tiles[r][c] === 0) { 
          return true;
        }
      }
    }
    return false;
  }

  return { nextTile,  slideLeft , slideRight ,slideUp, slideDown}
}