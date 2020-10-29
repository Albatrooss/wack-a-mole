import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './styles/app/app.css';

import Nav from './components/Nav';
import Footer from './components/Footer';

import Home from './pages/Home';
import Game from './pages/Game';
import Tutorial from './pages/Tutorial';

import Test from './components/Test';

function App() {

  const [tutorialShowing, setTutorialShowing] = useState(false);

  const [highScore, setHighScore] = useState(localStorage.getItem('highScore'));
  if (!highScore) localStorage.setItem('highScore', 0);

  const newHighScore = score => {
    localStorage.setItem('highScore', score);
    setHighScore(score);
  }

  const handleTutorialClick = () => setTutorialShowing(prev => !prev);

  return (
    <BrowserRouter>
      <Nav highScore={highScore} handleTutorialClick={handleTutorialClick} />
      <Switch>
        <Route exact path='/' render={({ history }) => <Home history={history} handleTutorialClick={handleTutorialClick} />} />
        <Route exact path='/play' render={({ history }) =>
          <Game
            history={history}
            handleTutorialClick={handleTutorialClick}
            highScore={highScore}
            newHighScore={newHighScore}
          />} />
        <Route exact path='/test' component={Test} />
        <Route path='/*' render={() => <main className="not-found"><h1 className="not-found__title">404 Page Not Found</h1></main>} />
      </Switch>
      <Footer />
      <Tutorial showing={tutorialShowing} handleClose={() => setTutorialShowing(false)} />

    </BrowserRouter>
  );
}

export default App;
