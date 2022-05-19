import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';

import { StoreContext } from '../../index';
import CellModel from '../../models/Cell';
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
    updateBoard();
  }, [store.selectedCell]);

  function onClick(cell: CellModel) {
    if (store.selectedCell && store.selectedCell !== cell && store.selectedCell.figure?.canMove(cell)) {
      store.selectedCell.moveFigure(cell);
      store.setSelectedCell(null);
      swapPlayer();
    } else {
      if (cell.figure?.color === store.currentPlayer?.color) {
        store.setSelectedCell(store.selectedCell === cell ? null : cell);
      }
    }
  }

  function updateBoard() {
    const newBoard = store.board.getCopyBoard();
    store.setBoard(newBoard);
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
              {row.map(cell =>
                <Cell
                  key={cell.id}
                  cell={cell}
                  onClick={onClick}
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
