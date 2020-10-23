import React, { useState, useRef, useEffect } from 'react'
import '../styles/game/game.css';

export default function Game({ scroll }) {

  const [score, setScore] = useState(0);
  const [clicked, setClicked] = useState(true);

  const wackerRef = useRef(null);

  useEffect(() => {
    document.addEventListener('mousemove', e => {
      let mouseX = e.clientX, mouseY = e.clientY;
      wackerRef.current.style.transform = `translate3d(
        ${mouseX - wackerRef.current.clientWidth / 2}px, 
        ${(mouseY - wackerRef.current.clientHeight / 2) - 20 + document.documentElement.scrollTop}px, 0)`
    })
    document.addEventListener('mousedown', e => setClicked(true));
    document.addEventListener('mouseup', e => setClicked(false));
  }, [])


  return (
    <main className="main-game">
      <div className="game">
        <div className="game__main">
          game
        <div className={`game__wacker ${clicked ? 'game__wacker--clicked' : ''} `} ref={wackerRef}></div>
        </div>
        <div className="game__ui">
          <h3 className="game__score">{score <= 9999 ? `000${score} `.slice(-4) : score}</h3>
          <ul className="game__btn-list">
            <li className="game__btn-list__item"><div className="game__wacker-btn">Wackers</div></li>
            <li className="game__btn-list__item"><div className="game__mole-btn">Moles</div></li>
            <li className="game__btn-list__item"><div className="game__difficulty-btn">Difficulty</div></li>
            <li className="game__btn-list__item"><div className="game__new-game-btn">New Game</div></li>
          </ul>
        </div>
      </div>
    </main>
  )
}
