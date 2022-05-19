import React from 'react';
import FigureModel from '../../models/Figure';

type LostFiguresTypes = {
  title: string;
  figures: FigureModel[];
}

const LostFigures: React.FC<LostFiguresTypes> = ({ title, figures }) => {
  return (
    <div className="lost">
      <h3>{title}</h3>
      {figures.map(((figure, index) =>
          <div key={figure.id}>
            {index + 1}. {figure.name} {figure.logo && <img src={figure.logo} alt={`${figure.name} figure image`} />}
          </div>
      ))}
    </div>
  );
};

export default LostFigures;
