import { createContext, useState } from "react";

const ScoreContext = createContext();

const ScoreProvider = ({children}) => {
  
  const pastBest = localStorage.getItem('bestScore') || 0
  const [bestScore, setBestScore ]= useState(pastBest)
  const [score, setScore] = useState(0);

  return (
    <ScoreContext.Provider value={{score, setScore , bestScore, setBestScore}}>
      {children}
    </ScoreContext.Provider>
  )
}

export {ScoreContext, ScoreProvider }