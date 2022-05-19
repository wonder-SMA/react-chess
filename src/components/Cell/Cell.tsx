import React from 'react';

import CellModel from '../../models/Cell';

type CellTypes = {
  cell: CellModel;
  onClick: (cell: CellModel) => void;
  selected: boolean;
}

const Cell: React.FC<CellTypes> = ({ cell, onClick, selected }) => {
  const mainClass = `
    cell
    ${cell.color}
    ${selected ? 'selected' : ''}
    ${cell.available ? 'available' : ''}
  `;

  return (
    <div
      className={mainClass}
      onClick={() => onClick(cell)}
    >
      {cell.figure?.logo &&
        <img
          src={cell.figure.logo}
          alt={`${cell.figure.name} figure image`}
          title={`${cell.figure.name} figure`}
        />
      }
    </div>
  );
};

export default Cell;
