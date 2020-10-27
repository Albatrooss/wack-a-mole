import React, { useState, useRef, useEffect } from 'react'
import '../styles/game/game.css';

import Interval from 'react-interval-rerender';
import Timer from '../components/Timer';

import { gridArray, gridTemplateArray, difficultyArr } from '../game/defaults';

export default function Game({ scroll }) {

  // THIS DISABLES THE WACKER FOLLOW ANIMATION
  const wackerDisabled = true;
  const muted = true;

  // ================== GAME STATE =====================

  const [difficutly, setDifficulty] = useState(1);
  const [score, setScore] = useState(0);
  const [clicked, setClicked] = useState(true);
  const [holes, setHoles] = useState(gridArray[difficutly])
  const [timesUp, setTimesUp] = useState(false);
  const [gameOn, setGameOn] = useState(false);

  // ================== GAME REFS =====================

  const wackerRef = useRef(null);

  // ================== GAME TEMPS =====================

  let tickerId;
  let ticker = 0;

  // ================== FUNCTIONS =====================

  const handleWack = id => {
    if (timesUp) return;
    let tempHoles = [...holes];
    tempHoles[id].showing = false;
    setScore(prev => prev + tempHoles[id].points)
    setHoles(tempHoles);
  }

  const handleChangeDifficulty = () => {
    let newDif = 0;
    setDifficulty(prev => {
      newDif = (prev + 1) % 3;
      return newDif
    })
    console.log(newDif)
    setHoles(gridArray[newDif]);
  }

  const handlePopMole = () => {
    if (timesUp || !gameOn) return;
    let tempHoles = [...holes];
    let showing = tempHoles.filter(hole => hole.showing);
    let available = tempHoles.filter(hole => !hole.showing);
    showing.forEach(hole => {
      tempHoles[hole.id].points -= 10;
      if (tempHoles[hole.id].points === 0) tempHoles[hole.id].showing = false
    })
    let ind = Math.floor(Math.random() * available.length);
    if (available[ind]) {
      tempHoles[available[ind].id] = { ...tempHoles[available[ind].id], showing: true, points: 50 }
    }
    setHoles(tempHoles);
  }

  useEffect(() => {
    if (!wackerDisabled) {
      document.addEventListener('mousemove', e => {
        let mouseX = e.clientX, mouseY = e.clientY;
        wackerRef.current.style.transform = `translate3d(
        ${mouseX - wackerRef.current.clientWidth / 2}px, 
        ${(mouseY - wackerRef.current.clientHeight / 2) - 20 + document.documentElement.scrollTop}px, 0)`
      })
      document.addEventListener('mousedown', e => setClicked(true));
      document.addEventListener('mouseup', e => setClicked(false));
    }
  }, [])

  useEffect(() => {
    let tickerId = setInterval(handlePopMole, 500);
    return () => clearInterval(tickerId);
  }, [holes, gameOn]);

  return (
    <main className="main-game">
      <div className="game">
        <div className={`game__main ${wackerDisabled ? 'game__main--cursor' : ''}`} style={gridTemplateArray[difficutly]}>
          {/* ================ Wacker ================ */}
          <div className={`game__wacker ${clicked ? 'game__wacker--clicked' : ''} ${wackerDisabled ? 'game__wacker--disabled' : ''}`} ref={wackerRef}></div>

          {holes.map((hole, i) => <div key={`mole=${i}`} className={`mole-square ${hole.showing ? 'mole-square--showing' : ''}`} onClick={() => handleWack(i)}>
            {hole.showing && <img className="mole-square__img" src="images/mole-ref.jpg" />}
          </div>)}

        </div>
        <div className="game__ui">
          <Timer timesUp={timesUp} gameOn={gameOn} handleTimesUp={() => setTimesUp(true)} muted={muted} />
          <h3 className="game__score">{score <= 9999 ? `000${score}`.slice(-4) : score}</h3>
          <ul className="game__btn-list">
            <li className="game__btn-list__item"><div className="game__wacker-btn">Wackers</div></li>
            <li className="game__btn-list__item"><div className="game__mole-btn">Moles</div></li>
            <li className="game__btn-list__item"><div className="game__difficulty-btn" onClick={handleChangeDifficulty}>Difficulty {difficultyArr[difficutly]}</div></li>
            <li className="game__btn-list__item"><div className="game__new-game-btn" onClick={() => setGameOn(true)}>Start</div></li>
          </ul>
        </div>
      </div>
    </main >
  )
}
