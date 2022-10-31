import globeIcon from '../assets/svg/globe.svg';
import linkedInIcon from '../assets/svg/linkedin.svg';
import githubIcon from '../assets/svg/github.svg';
import footerWave from '../assets/svg/footer-wave.svg'

function Footer() {
  return (
    <footer>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 250"><path fill="#0F394D" fill-opacity="1" d="M0,128L80,154.7C160,181,320,235,480,218.7C640,203,800,117,960,96C1120,75,1280,117,1360,138.7L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
        <div className="footer__content">
          <p>Developed by Anoj</p>
          <div className="footer__icons">
              <a href="https://anoj-kt.github.io/anojkrishna" target="blank"><img src={globeIcon} alt="Anoj website" className="footer__icon" /></a>
              <a href="https://www.linkedin.com/in/anojkrishna" target="blank"><img src={linkedInIcon} alt="Anoj website" className="footer__icon" /></a>
              <a href="https://github.com/anoj-kt" target="blank"><img src={githubIcon} alt="Anoj website" className="footer__icon" /></a>
          </div>
        </div>
        
    </footer>
  )
}

export default Footer