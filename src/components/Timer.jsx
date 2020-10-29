import React, { useState, useEffect } from 'react'

export default function Timer({ timesUp, handleTimesUp, muted, gameOn }) {

  const [timer, setTimer] = useState(20);

  let tickerId;

  const handleTick = () => {
    if (timesUp || timer < 1 || !gameOn) return;
    if (timer === 1) handleTimesUp()
    if (!muted) {
      if (timer > 1) {
        new Audio('sounds/beep4.wav').play();
      } else if (timer < 4) {
        new Audio('sounds/beep1.wav').play();
      }
    }
    setTimer(prev => prev - 1)
  }

  useEffect(() => {
    tickerId = setInterval(handleTick, 1000);
    return () => {
      clearInterval(tickerId);
    }
  }, [timesUp, timer, gameOn])

  return (
    <h4 className="game__timer">{timesUp ? 'TIME UP' : <>{timer <= 99 ? `0${timer}`.slice(-2) : timer}</>}</h4>
  )
}
