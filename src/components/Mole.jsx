import React, { useState, useEffect } from 'react';

export default function Mole({ type }) {
  let [forwards, setForwards] = useState(Math.floor(Math.random() * 2));
  const [image, setImage] = useState(forwards ? 0 : 59);

  const tickUp = () => {
    if (image > 58) return
    setImage(prev => prev + 1);
  }

  const tickDown = () => {
    if (image < 1) return
    setImage(prev => prev - 1);
  }

  useEffect(() => {
    let intId2 = forwards ? setInterval(tickUp, 42) : setInterval(tickDown, 42);
    return () => clearInterval(intId2);
  }, [image])

  return <img className="mole-square__img" src={`images/mole-${type === 0 ? 'fram0' : 'purple'}${`0${image}`.slice(-2)}.png`} />
}