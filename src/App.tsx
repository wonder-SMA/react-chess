import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';

import './App.scss';
import Board from './components/Board';
import LostFigures from './components/LostFigures';
import Timer from './components/Timer';
import { StoreContext } from './index';
import BoardModel from './models/Board';
import { Colors } from './models/Colors';

const App: React.FC = observer(() => {
  const store = useContext(StoreContext);

  useEffect(() => {
      restart();
    }, []
  );

  function restart() {
    const newBoard = new BoardModel();
    newBoard.initCells();
    newBoard.addFigure();
    store.setBoard(newBoard);
    store.setInitialPlayer();
  }

  function swapPlayer() {
    store.setCurrentPlayer(store.currentPlayer?.color === Colors.WHITE ? store.blackPlayer : store.whitePlayer);
  }

  return (
    <div className="App">
      <Timer
        restart={restart}
      />
      <div>
        <LostFigures
          title="Black figures"
          figures={store.board.lostBlackFigures}
        />
        <Board
          swapPlayer={swapPlayer}
        />
        <LostFigures
          title="White figures"
          figures={store.board.lostWhiteFigures}
        />
      </div>
    </div>
  );
});

export default App;
