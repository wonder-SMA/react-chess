import React, { useEffect, useState } from 'react';

import './App.scss';
import Board from './components/Board';
import LostFigures from './components/LostFigures';
import BoardModel from './models/Board';
import { Colors } from './models/Colors';
import PlayerModel from './models/Player';


const App: React.FC = () => {
  const [board, setBoard] = useState(new BoardModel());
  const [whitePlayer, setWhitePlayer] = useState(new PlayerModel(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new PlayerModel(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<PlayerModel | null>(null);

  useEffect(() => {
      restart();
    }, []
  );

  function restart() {
    const newBoard = new BoardModel();
    newBoard.initCells();
    newBoard.addFigure();
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer);
  }

  function swapPlayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
  }

  return (
    <div className="App">
      <LostFigures
        title="Черные фигуры"
        figures={board.lostBlackFigures}
      />
      <Board
        board={board}
        setBoard={setBoard}
        swapPlayer={swapPlayer}
        currentPlayer={currentPlayer}
      />
      <LostFigures
        title="Белые фигуры"
        figures={board.lostWhiteFigures}
      />
    </div>
  );
}

export default App;
