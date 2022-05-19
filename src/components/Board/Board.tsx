import React, { useEffect, useState } from 'react';

import BoardModel from '../../models/Board';
import CellModel from '../../models/Cell';
import PlayerModel from '../../models/Player';
import Cell from '../Cell';
import Characters from '../Characters';
import Numbers from '../Numbers';
import classes from './Board.module.scss';

type BoardTypes = {
  board: BoardModel;
  setBoard: (board: BoardModel) => void;
  swapPlayer: () => void;
  currentPlayer: PlayerModel | null;
}

const Board: React.FC<BoardTypes> = ({ board, setBoard, swapPlayer, currentPlayer }) => {
  const [selectedCell, setSelectedCell] = useState<CellModel | null>(null);

  useEffect(() => {
    board.highlightCells(selectedCell);
    updateBoard();
  }, [selectedCell]);

  function onClick(cell: CellModel) {
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell);
      setSelectedCell(null);
      swapPlayer();
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        setSelectedCell(selectedCell === cell ? null : cell);
      }
    }
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  return (
    <div>
      <h3>Текущий игрок: {currentPlayer?.color}</h3>
      <div className={classes.edge}>
        <Characters position="top" />
        <Numbers position="right" />
        <div className={classes.board}>
          {board.cells.map((row, index) =>
            <React.Fragment key={index}>
              {row.map(cell =>
                <Cell
                  key={cell.id}
                  cell={cell}
                  onClick={onClick}
                  selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                />
              )}
            </React.Fragment>
          )}
        </div>
        <Characters position="bottom" />
        <Numbers position="left" />
      </div>
    </div>
  );
};

export default Board;
