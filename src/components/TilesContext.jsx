import { createContext, useState } from "react";

const TilesContext = createContext();

const TilesProvider = ({children}) => {
  
  const board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]

  const [tiles, setTiles] = useState(board); 
    const [score, setScore] = useState(0);

  return (
    <TilesContext.Provider value={{tiles, setTiles, score, setScore}}>
      {children}
    </TilesContext.Provider>
  )
}

export {TilesContext, TilesProvider }