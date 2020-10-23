import React, { useState } from 'react'
import '../styles/tutorial/tutorial.css';

export default function Tutorial({ showing, handleClose }) {

  const [slide, setSlide] = useState(0);

  return (
    <section className={`main-tutorial ${showing ? '' : 'tutorial--hidden'}`}>
      <div className="tutorial">
        <div className="tutorial__cards" style={{ left: `${-100 * slide}%` }}>
          <div className="tutorial__card tutorial__card01">
            <h2 className="tutorial__card__title">Slide 01</h2>
            <p className="tutorial__card__description">Scrollin slides that explain how to play..</p>
          </div>
          <div className="tutorial__card tutorial__card02">
            <h2 className="tutorial__card__title">Slide 02</h2>
            <p className="tutorial__card__description">Scrollin slides that explain how to play..</p>
          </div>
          <div className="tutorial__card tutorial__card03">
            <h2 className="tutorial__card__title">Slide 03</h2>
            <p className="tutorial__card__description">Scrollin slides that explain how to play..</p>
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
