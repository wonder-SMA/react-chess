import React from 'react';

type NumbersTypes = {
  position: string
}

const Numbers: React.FC<NumbersTypes> = ({ position }) => {
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8'];

  return (
    <div className={`num ${position === 'right' ? 'right' : 'left'}`}>
      {numbers.map((number, index) =>
        <span key={index}>{number}</span>
      )}
    </div>
  );
};

export default Numbers;
