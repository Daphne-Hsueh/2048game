import Header from './components/Header';
import Board from './components/Board';
import { TilesProvider } from './components/TilesContext';
// import { ScoreProvider } from './components/ScoreContext';

function App() {
  return (
    <>
    {/* <ScoreProvider> */}
      <TilesProvider> 
        <Header/>
        <Board/>
       </TilesProvider> 
     {/* </ScoreProvider> */}
    </>

  );
}

export default App;
