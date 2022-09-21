import { useNavigate, useLocation } from 'react-router-dom';
import {ReactComponent as OfferIcon } from '../assets/svg/localOfferIcon.svg'
import {ReactComponent as ExploreIcon } from '../assets/svg/exploreIcon.svg'
import {ReactComponent as PersonOutlineIcon } from '../assets/svg/personOutlineIcon.svg'

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const pathMatch = (route) => {
        if(route === location.pathname) {
            return true
        }
    }

    return (
      <footer className="navbar__container">
        <nav className="navbar__nav">
            <ul className="navbar__items">
                <li className="navbar__item" onClick={() => navigate('/')}>
                    <ExploreIcon fill={pathMatch('/')? "#2c2c2c" : "#8f8f8f"} width="36px" height="36px"/>
                    <p
                    className={pathMatch('/')? "navbar__itemNameActive" : "navbar__itemName"}
                    >
                    Explore
                    </p>
                </li>
                <li className="navbar__item">
                    <OfferIcon fill={pathMatch('/offers')? "#2c2c2c" : "#8f8f8f"} width="36px" height="36px" onClick={() => navigate('/offers')}/>
                    <p
                    className={pathMatch('/offers')? "navbar__itemNameActive" : "navbar__itemName"}
                    >
                    Offers
                    </p>
                </li>
                <li className="navbar__item">
                    <PersonOutlineIcon fill={pathMatch('/profile')? "#2c2c2c" : "#8f8f8f"} width="36px" height="36px" onClick={() => navigate('/profile')}/>
                    <p
                    className={pathMatch('/profile')? "navbar__itemNameActive" : "navbar__itemName"}
                    >
                    Profile
                    </p>
                </li>
            </ul>
        </nav>
      </footer>
    );
  }
  
  export default Navbar;
  