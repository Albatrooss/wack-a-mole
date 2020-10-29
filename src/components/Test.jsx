import React, { useState, useEffect } from 'react'

function Mole({ showing }) {
  const [image, setImage] = useState(0);

  const ticktock = () => {
    if (image > 58) return;
    setImage(prev => prev + 1);
  }

  useEffect(() => {
    let intId = setInterval(ticktock, 42);
    return () => clearInterval(intId);
  }, [image])

  return showing ? <img src={`images/mole-frame${`00${image}`.slice(-3)}.png`} style={{ width: '30%' }} /> : <></>
}

function Mole2() {
  const [image, setImage] = useState(0);

  const [showing, setShowing] = useState(true);

  const ticktock = () => {
    if (image > 58) return setShowing(false);
    setImage(prev => prev + 1);
  }

  useEffect(() => {
    let intId2 = setInterval(ticktock, 42);
    return () => clearInterval(intId2);
  }, [image])

  return showing ? <img src={`images/mole-frame${`00${image}`.slice(-3)}.png`} style={{ width: '30%' }} /> : <></>
}

export default function Test() {

  const [gif1, setGif1] = useState(true);
  const [gif2, setGif2] = useState(false);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      TEST
      {gif1 && <Mole2 />}
      {gif2 && <Mole2 />}
      <button onClick={() => setGif2(prev => !prev)}>asdfads</button>
    </div>
  )
}
