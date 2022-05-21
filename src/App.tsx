import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';

import './App.scss';
import Board from './components/Board';
import LostFigures from './components/LostFigures';
import Timer from './components/Timer';
import { StoreContext } from './index';
import BoardModel from './models/Board';
import CellModel from './models/Cell';
import { Colors } from './models/Colors';

const App: React.FC = observer(() => {
  const store = useContext(StoreContext);

  useEffect(() => {
      restart();
    }, []
  );

  useEffect(() => {
      const isInCheck = store.currentPlayer?.color === Colors.WHITE
        ? checkForIsInCheck(store.whiteKingCell) : checkForIsInCheck(store.blackKingCell);
      store.setIsInCheck(isInCheck);
      if (isInCheck && store.currentPlayer?.color === Colors.WHITE) {
        alert('The White King is in check!');
      } else if (isInCheck && store.currentPlayer?.color === Colors.BLACK) {
        alert('The Black King is in check!');
      }
    }, [store.currentPlayer]
  );

  function restart() {
    const newBoard = new BoardModel();
    newBoard.initCells();
    newBoard.addFigure();
    store.setBoard(newBoard);
    store.setWhiteKingCell(store.board.cells[7][4]);
    store.setBlackKingCell(store.board.cells[0][4]);
    store.setInitialPlayer();
  }

  function swapPlayer() {
    store.setCurrentPlayer(store.currentPlayer?.color === Colors.WHITE ? store.blackPlayer : store.whitePlayer);
  }

  function checkForIsInCheck(kingCell: CellModel | null) {
    for (let i = 0; i < store.board.cells.length; i++) {
      const row = store.board.cells[i];
      for (let j = 0; j < row.length; j++) {
        const cell = row[j];
        if (cell.figure?.color !== kingCell?.figure?.color
          && cell.figure?.name !== 'King'
          && cell.figure?.canMove(kingCell)) {
          return true;
        }
      }
    }
    return false;
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
