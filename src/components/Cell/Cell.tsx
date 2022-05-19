import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';

import { StoreContext } from '../../index';
import CellModel from '../../models/Cell';
import classes from './Cell.module.scss';

type CellTypes = {
  cell: CellModel;
  onClick: (cell: CellModel) => void;
}

const Cell: React.FC<CellTypes> = observer(({ cell, onClick }) => {
  const store = useContext(StoreContext);

  console.log('render from Cell');

  const mainClass = cn(classes.cell, {
    [classes.black]: cell.color === 'Black',
    [classes.white]: cell.color === 'White',
    [classes.selected]: cell.x === store.selectedCell?.x && cell.y === store.selectedCell?.y,
    [classes.available]: cell.available,
  });

  return (
    <div
      className={mainClass}
      onClick={() => onClick(cell)}
    >
      {cell.figure?.logo &&
        <img
          src={cell.figure.logo}
          alt={`${cell.figure.name} figure on the board`}
          title={`${cell.figure.name} figure`}
        />
      }
    </div>
  );
});

export default Cell;
