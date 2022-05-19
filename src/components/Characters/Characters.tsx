import React from 'react';
import cn from 'classnames';

import classes from './Characters.module.scss';

type CharactersTypes = {
  position: string
}

const Characters: React.FC<CharactersTypes> = ({ position }) => {
  const characters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  const mainClass = cn(classes.abc, {
    [classes.top]: position === 'top',
    [classes.bottom]: position === 'bottom',
  });

  return (
    <div className={mainClass}>
      {characters.map((character, index) =>
        <span key={index}>{character}</span>
      )}
    </div>
  );
};

export default Characters;
