import globeIcon from '../assets/svg/globe.svg';
import linkedInIcon from '../assets/svg/linkedin.svg';
import githubIcon from '../assets/svg/github.svg';

function Footer() {
  return (
    <div>
        <p>Developed by Anoj</p>
        <div>
            <img src={globeIcon} alt="Anoj website" className="footer__icon" />
            <img src={linkedInIcon} alt="Anoj website" className="footer__icon" />
            <img src={githubIcon} alt="Anoj website" className="footer__icon" />
        </div>
    </div>
  )
}

export default Footer