import React, { useState, useRef, useEffect } from 'react'
import '../styles/game/game.css';

import Interval from 'react-interval-rerender';
import Timer from '../components/Timer';
import Mole from '../components/Mole';

import { gridArray, gridTemplateArray, difficultyArr, difficultySpeeds, wackerList, soundList } from '../game/defaults';

export default function Game({ highScore, newHighScore }) {

  // THIS DISABLES THE WACKER FOLLOW ANIMATION
  const wackerDisabled = false;
  const muted = false;

  // ================== GAME STATE =====================

  const [wacker, setWacker] = useState(0);
  const [mole, setMole] = useState(0);
  const [difficutly, setDifficulty] = useState(1);

  const [score, setScore] = useState(0);
  const [clicked, setClicked] = useState(true);
  const [holes, setHoles] = useState(gridArray[difficutly])
  const [timesUp, setTimesUp] = useState(false);
  const [gameOn, setGameOn] = useState(false);

  // ================== GAME REFS =====================

  const wackerRef = useRef(null);
  const gameRef = useRef(null);

  // ================== GAME TEMPS =====================

  let tickerId;
  let ticker = 0;

  // ================== FUNCTIONS =====================

  const handleNewGame = () => {
    setTimesUp(false);
    setGameOn(true);
    setScore(0);
  }

  const handleGameOver = () => {
    setTimesUp(true);
    setGameOn(false);
  }

  const handleWack = id => {
    if (!gameOn) return;
    let tempHoles = [...holes];
    if (tempHoles[id].showing) {
      new Audio(`sounds/${soundList[wacker]}.wav`).play();
    } else {
      new Audio('sounds/woosh01.wav').play();
    }
    tempHoles[id].showing = false;
    let newScore;
    setScore(prev => {
      newScore = prev + tempHoles[id].points;
      if (newScore > highScore) newHighScore(newScore);
      return newScore;
    })
    setHoles(tempHoles);
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
      new Audio('sounds/squeak01.wav').play();
      tempHoles[available[ind].id] = { ...tempHoles[available[ind].id], showing: true, points: 50 }
    }
    setHoles(tempHoles);
  }

  const changeDifficulty = diff => {
    if (gameOn) return;
    setDifficulty(diff);
  }

  useEffect(() => {
    if (!wackerDisabled) {
      const body = document.querySelector('body');
      gameRef.current.addEventListener('mousemove', e => {
        let mouseX = e.clientX, mouseY = e.clientY;

        let offsetX = body.clientWidth > 1366 ? (body.clientWidth - 1366) / 2 : 0;
        let offsetY = 0 - window.scrollY + 240;

        wackerRef.current.style.top = `${mouseY - offsetY}px`;
        wackerRef.current.style.left = `${mouseX - offsetX - 45}px`;
      })
      document.addEventListener('mousedown', e => setClicked(true));
      document.addEventListener('mouseup', e => setClicked(false));
    }
    for (let i = 0; i < 60; i++) {
      let img1 = new Image().src = `images/mole-fram0${`0${i}`.slice(-2)}.png`
      let img2 = new Image().src = `images/mole-purple${`0${i}`.slice(-2)}.png`
    }
  }, [])

  useEffect(() => {
    let tickerId = setInterval(handlePopMole, difficultySpeeds[difficutly]);
    return () => clearInterval(tickerId);
  }, [holes, gameOn]);

  useEffect(() => {
    setHoles(gridArray[difficutly]);
  }, [difficutly])

  return (
    <main className="main-game">
      <div className="game">
        <div ref={gameRef} className={`game__main ${wackerDisabled ? 'game__main--cursor' : ''}`} style={gridTemplateArray[difficutly]}>
          {/* ================ Wacker ================ */}
          <div className={`game__wacker ${clicked ? 'game__wacker--clicked' : ''} ${wackerDisabled ? 'game__wacker--disabled' : ''}`} ref={wackerRef}>
            <img src={`/images/${wackerList[wacker]}${clicked ? 3 : 1}.svg`} /></div>

          {holes.map((hole, i) => <div key={`mole=${i}`} className={`mole-square`} onClick={() => handleWack(i)}>
            {hole.showing ? <Mole type={mole} /> : <img className="mole-square__img" src="images/hole01.png" />}
          </div>)}

        </div>
        <div className="game__ui">
          {gameOn && <Timer timesUp={timesUp} gameOn={gameOn} handleTimesUp={handleGameOver} muted={muted} />}
          <h3 className="game__score">{score <= 9999 ? `000${score}`.slice(-4) : score}</h3>
          <ul className="game__btn-list">
            <li className="game__btn-list__item">
              <h4>Wackers</h4>
              <div className={`game__btn ${wacker === 0 ? 'game__btn--current' : ''}`} onClick={() => setWacker(0)}><img className="wacker__icon" src="images/wacker-brown01.svg" alt="" /></div>
              <div className={`game__btn ${wacker === 1 ? 'game__btn--current' : ''}`} onClick={() => setWacker(1)}><img className="wacker__icon" src="images/silver-hammer-1.svg" alt="" /></div>
              <div className={`game__btn ${wacker === 2 ? 'game__btn--current' : ''}`} onClick={() => setWacker(2)}><img className="wacker__icon" src="images/ray-gun01.svg" alt="" /></div>
            </li>
            <li className="game__btn-list__item">
              <h4>Moles</h4>
              <div className={`game__btn ${mole === 0 ? 'game__btn--current' : ''}`} onClick={() => setMole(0)}><div className="game__btn__brown"></div></div>
              <div className={`game__btn ${mole === 1 ? 'game__btn--current' : ''} purple`} onClick={() => setMole(1)}><div className="game__btn__purple"></div></div>
            </li>
            <li className="game__btn-list__item">
              <h4>Difficulty</h4>
              <div className={`game__btn ${difficutly === 0 ? 'game__btn--current' : ''}`} onClick={() => changeDifficulty(0)}>Easy</div>
              <div className={`game__btn ${difficutly === 1 ? 'game__btn--current' : ''}`} onClick={() => changeDifficulty(1)}>Mild</div>
              <div className={`game__btn ${difficutly === 2 ? 'game__btn--current' : ''}`} onClick={() => changeDifficulty(2)}>Hard</div>
            </li>
            <li className="game__btn-list__item">
              <div className="game__btn game__btn--new-game" onClick={handleNewGame}>New Game</div>
            </li>
          </ul>
        </div>
      </div>
    </main >
  )
}
