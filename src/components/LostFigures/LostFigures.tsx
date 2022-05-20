import React from 'react';

import FigureModel from '../../models/Figure';
import classes from './LostFigures.module.scss';

type LostFiguresTypes = {
  title: string;
  figures: FigureModel[];
}

const LostFigures: React.FC<LostFiguresTypes> = ({ title, figures }) => {
  return (
    <div className={classes.lost}>
      <h3>{title}</h3>
      {figures.map(((figure, index) =>
          <div key={index}>
            {index + 1}. {figure.name}
            {figure.logo && <img src={figure.logo} alt={`${figure.name} figure in the list`} />}
          </div>
      ))}
    </div>
  );
};

export default LostFigures;
