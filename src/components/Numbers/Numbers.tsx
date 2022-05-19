import React from 'react';
import cn from 'classnames';

import classes from './Numbers.module.scss';

type NumbersTypes = {
  position: string
}

const Numbers: React.FC<NumbersTypes> = ({ position }) => {
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8'];

  const mainClass = cn(classes.num, {
    [classes.left]: position === 'left',
    [classes.right]: position === 'right',
  });

  return (
    <div className={mainClass}>
      {numbers.map((number, index) =>
        <span key={index}>{number}</span>
      )}
    </div>
  );
};

export default Numbers;
