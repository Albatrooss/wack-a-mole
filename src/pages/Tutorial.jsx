import React, { useState } from 'react'
import '../styles/tutorial/tutorial.css';

export default function Tutorial({ showing, handleClose }) {

  const [slide, setSlide] = useState(0);

  return (
    <section className={`main-tutorial ${showing ? '' : 'tutorial--hidden'}`}>
      <div className="tutorial">
        <div className="tutorial__cards" style={{ left: `${-100 * slide}%` }}>
          <div className="tutorial__card tutorial__card01">
            <h2 className="tutorial__card__title">Welcome!</h2>
            <img src="images/screenshot-easy.png" alt="" />
            <p className="tutorial__card__description">Wack as many Moles as you can before time runs out!</p>
          </div>
          <div className="tutorial__card tutorial__card02">
            <h2 className="tutorial__card__title">Pick the Difficulty</h2>
            <img src="images/screenshot-medium.png" alt="" />
            <p className="tutorial__card__description">Before each round, choose the difficulty level on the right</p>
          </div>
          <div className="tutorial__card tutorial__card03">
            <h2 className="tutorial__card__title">Change you wacker!</h2>
            <img src="images/screenshot-hard.png" alt="" />
            <p className="tutorial__card__description">You can pick different wacking weapons to get those moles!</p>
          </div>
        </div>
        <img src="logos/blue-left-indicator.svg" alt="left arrow" className="tutorial__left-indicator" onClick={() => setSlide(prev => prev === 0 ? 2 : prev - 1)} />
        <img src="logos/blue-right-indicator.svg" alt="right arrow" className="tutorial__right-indicator" onClick={() => setSlide(prev => (prev + 1) % 3)} />
        <ul className="tutorial__dot-list">
          <li className={`tutorial__dot ${slide === 0 ? 'tutorial__dot--active' : ''}`}></li>
          <li className={`tutorial__dot ${slide === 1 ? 'tutorial__dot--active' : ''}`}></li>
          <li className={`tutorial__dot ${slide === 2 ? 'tutorial__dot--active' : ''}`}></li>
        </ul>
        <div className="tutorial__x" onClick={handleClose}><span></span></div>
      </div>
    </section>
  )
}
