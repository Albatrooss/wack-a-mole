import React from 'react';
import '../styles/nav/nav.css';

export default function Nav({ highScore, handleTutorialClick }) {

  highScore = highScore ? highScore : 0;

  return (
    <header>
      <nav className="nav">
        <a href="/" className="nav__logo">Tim's Wack-a-Mole</a>
        <ul className="nav__list">
          <li className="nav__item"><p className="nav__link" onClick={handleTutorialClick} >Tutorial</p></li>
          <li className="nav__item"><p className="nav__score">High Score: {(highScore) <= 9999 ? `000${highScore}`.slice(-4) : highScore}</p></li>
        </ul>
      </nav>
    </header >
  )
}
