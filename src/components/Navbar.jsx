import { useNavigate, useLocation } from 'react-router-dom';
import {ReactComponent as OfferIcon } from '../assets/svg/localOfferIcon.svg'
import {ReactComponent as ExploreIcon } from '../assets/svg/exploreIcon.svg'
import {ReactComponent as PersonOutlineIcon } from '../assets/svg/personOutlineIcon.svg'

function Navbar() {
    return (
      <footer className="navbar__container">
        <nav className="navbar__nav">
            <ul className="navbar__items">
                <li className="navbar__item">
                    <ExploreIcon fill="#2c2c2c" width="36px" height="36px"/>
                    <p>Explore</p>
                </li>
                <li className="navbar__item">
                    <OfferIcon fill="#2c2c2c" width="36px" height="36px"/>
                    <p>Offers</p>
                </li>
                <li className="navbar__item">
                    <PersonOutlineIcon fill="#2c2c2c" width="36px" height="36px"/>
                    <p>Profile</p>
                </li>
            </ul>
        </nav>
      </footer>
    );
  }
  
  export default Navbar;
  