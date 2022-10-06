import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import logo from '../assets/logo/logo-main.svg';
import menuOpen from '../assets/svg/nav-hamburger-bars.svg';
import menuClose from '../assets/svg/close-x.svg';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const navigate = useNavigate();
    const location = useLocation();

    const pathMatch = (route) => {
        if(route === location.pathname) {
            return true
        }
    }

    return (
      <nav className="navbar__container">
            <img className="navbar__logo-img" src={logo} alt="logo" onClick={() => navigate('/')}/>
            <div className="navbar__toggle-container">
                <img 
                    src={
                        isMenuOpen ? menuClose : menuOpen
                    } 
                    alt="menu toggle" 
                    className="navbar__toggle-icon" 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                />
            </div>
            <ul className="navbar__items">
                <li className="navbar__item" onClick={() => navigate('/')}>
                    <p
                    className={pathMatch('/')? "navbar__itemNameActive" : "navbar__itemName"}
                    >
                    Explore
                    </p>
                </li>
                <li className="navbar__item">
                    <p
                    className={pathMatch('/offers')? "navbar__itemNameActive" : "navbar__itemName"}
                    >
                    Offers
                    </p>
                </li>
                <li className="navbar__item">
                    <p
                    className={pathMatch('/offers')? "navbar__itemNameActive" : "navbar__itemName"}
                    >
                    Post property
                    </p>
                </li>
                <li className="navbar__item">
                    <p
                    className={pathMatch('/profile')? "navbar__itemNameActive" : "navbar__itemName"}
                    >
                    Profile
                    </p>
                </li>
            </ul>
      </nav>
    );
  }
  
  export default Navbar;
  