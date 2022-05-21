import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';

import { StoreContext } from '../../index';
import CellModel from '../../models/Cell';
import { Colors } from '../../models/Colors';
import Cell from '../Cell';
import Characters from '../Characters';
import Numbers from '../Numbers';
import classes from './Board.module.scss';

type BoardTypes = {
  swapPlayer: () => void;
}

const Board: React.FC<BoardTypes> = observer(({ swapPlayer }) => {
  const store = useContext(StoreContext);

  useEffect(() => {
    store.board.highlightCells(store.selectedCell);
    const newBoard = store.board.getCopyBoard();
    store.setBoard(newBoard);
  }, [store.selectedCell]);

  function onClick(cell: CellModel) {
    if (store.selectedCell && store.selectedCell !== cell && store.selectedCell.figure?.canMove(cell)) {
      if (store.selectedCell.figure?.name === 'King' && store.selectedCell.figure.color === Colors.WHITE) {
        store.setWhiteKingCell(cell);
      } else if (store.selectedCell.figure?.name === 'King' && store.selectedCell.figure.color === Colors.BLACK) {
        store.setBlackKingCell(cell);
      }
      if (cell.figure?.name === 'King') {
        return false;
      }
      if (store.isInCheck && store.selectedCell.figure?.name !== 'King') {
        store.setSelectedCell(store.currentPlayer?.color === Colors.WHITE ? store.whiteKingCell : store.blackKingCell);
        alert('The ' + String(store.currentPlayer?.color) + ' King is in check!');
        return false;
      }
      store.selectedCell.moveFigure(cell);
      store.setSelectedCell(null);
      swapPlayer();
    } else {
      if (cell.figure?.color === store.currentPlayer?.color) {
        store.setSelectedCell(store.selectedCell === cell ? null : cell);
      }
    }
  }

  return (
    <div>
      <h3>Current player: {store.currentPlayer?.color}</h3>
      <div className={classes.edge}>
        <Characters position="top" />
        <Numbers position="right" />
        <div className={classes.board}>
          {store.board.cells.map((row, index) =>
            <React.Fragment key={index}>
              {row.map((cell, index) =>
                <Cell
                  key={index}
                  cell={cell}
                  onClick={onClick}
                  selected={cell.x === store.selectedCell?.x && cell.y === store.selectedCell.y}
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
});

export default Board;
