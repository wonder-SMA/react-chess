import React from 'react';

type CharactersTypes = {
  position: string
}

const Characters: React.FC<CharactersTypes> = ({ position }) => {
  const characters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  return (
    <div className={`abc ${position === 'top' ? 'top' : 'bottom'}`}>
      {characters.map((character, index) =>
        <span key={index}>{character}</span>
      )}
    </div>
  );
};

export default Characters;
