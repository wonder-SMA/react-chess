import React, { useContext, useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '../../index';

import { Colors } from '../../models/Colors';
import classes from './Timer.module.scss';

type TimerTypes = {
  restart: () => void;
}


const Timer: React.FC<TimerTypes> = observer(({ restart }) => {
  const store = useContext(StoreContext);
  const [blackTime, setBlackTime] = useState(300);
  const [whiteTime, setWhiteTime] = useState(300);
  const [isOver, setIsOver] = useState(false);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    const callback = store.currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;
    timer.current = setInterval(callback, 1000);
    return () => {
      timer.current && clearInterval(timer.current);
    };
  }, [store.currentPlayer]);

  useEffect(() => {
    if (!blackTime || !whiteTime) {
      alert('The player ' + String(store.currentPlayer?.color) + ' is lose!');
    }
  }, [isOver]);

  function checkTimer(time: number) {
    if (!time) {
      timer.current && clearInterval(timer.current);
      setIsOver(true);
      return 0;
    }
    return time;
  }

  function decrementWhiteTimer() {
    setWhiteTime(prev => {
      return checkTimer(prev - 1);
    });
  }

  function decrementBlackTimer() {
    setBlackTime(prev => {
      return checkTimer(prev - 1);
    });
  }

  const handleRestart = () => {
    setWhiteTime(300);
    setBlackTime(300);
    restart();
  };

  return (
    <div className={classes.timer}>
      <h3>Timer: {blackTime} s.</h3>
      <button onClick={handleRestart}>
        Restart game
      </button>
      <h3>Timer: {whiteTime} s.</h3>
    </div>
  );
});

export default Timer;
