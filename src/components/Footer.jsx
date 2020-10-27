import React from 'react'
import '../styles/footer/footer.css';

export default function Footer() {
  return (
    <footer>
      <div className="footer">
        <div className="footer__col">
          <p className="footer__descr">Made for a Mintbeam Hack-a-Thon</p>
          <a href="https://www.mintbean.io/" target="_blank" className="footer__link">mintbeam.io</a>
        </div>
        <div className="footer__col">
          <p className="footer__descr">Check out my personal website!</p>
          <a href="https://timrobillard.ca" target="_blank" className="footer__link">timrobillard.ca</a>
        </div>
        <div className="footer__hire">
          <p className="footer__hire-me">HIRE ME!</p>

        </div>
        <ul className="footer__col--list">
          <li className="footer__item"><a href="#" className="footer__link"><img className="footer__logo" src="logos/my-github.svg" alt="github-logo" /></a></li>
          <li className="footer__item"><a href="#" className="footer__link"><img className="footer__logo" src="logos/my-linkedin.svg" alt="github-logo" /></a></li>
        </ul>
      </div>
    </footer>
  )
}
