import React from 'react'

export default function Home({ history, handleTutorialClick }) {
  return (
    <main className="main-home">
      <div className="home">
        <h1 className="home__title">Welcome to<br />Wack-a-Mole!</h1>
        <a href="/play" className="home__start-btn">Start Game</a>
        <p onClick={handleTutorialClick} className="home__link">View the tutorial</p>
      </div>
    </main>
  )
}
