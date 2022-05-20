import React from 'react';
import cn from 'classnames';

import CellModel from '../../models/Cell';
import classes from './Cell.module.scss';

type CellTypes = {
  cell: CellModel;
  onClick: (cell: CellModel) => void;
  selected: boolean;
}

const Cell: React.FC<CellTypes> = ({ cell, onClick, selected }) => {
  const mainClass = cn(classes.cell, {
    [classes.black]: cell.color === 'Black',
    [classes.white]: cell.color === 'White',
    [classes.selected]: selected,
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
};

export default Cell;
