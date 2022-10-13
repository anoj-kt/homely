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
        <div className="navbar__logo-container">
            <img className="navbar__logo" src={logo} alt="logo" onClick={() => navigate('/')}/>
            <img 
                    src={menuOpen} 
                    alt="menu toggle"
                    className="navbar__toggle-hamburger" 
                    onClick={() => {
                        setIsMenuOpen(!isMenuOpen)                   
                    }}
                />
        </div>
        <div className={isMenuOpen ? "navbar__links" : "navbar__links--close"}>
            <div className={isMenuOpen ? "body__background__navbar--open" : "body__background__navbar--close"}></div>
            <img 
                src={menuClose} 
                alt="menu toggle" 
                className={isMenuOpen && "navbar__toggle navbar__toggle-cross" } 
                onClick={() => {
                    setIsMenuOpen(!isMenuOpen)
                }}
            />
            <ul className="navbar__items">
                <li 
                    className="navbar__item" 
                    onClick={() => {
                        navigate('/')
                        setIsMenuOpen(!isMenuOpen)
                    }}
                >
                    Explore
                </li>
                <li 
                    className="navbar__item" 
                    onClick={() => {
                        navigate('/offers')
                        setIsMenuOpen(!isMenuOpen)
                    }}
                >
                    Offers
                </li>
                <li 
                    className="navbar__item" 
                    onClick={() => {
                        navigate('/create-listing')
                        setIsMenuOpen(!isMenuOpen)
                    }}
                >
                    Post property
                </li>
                <li 
                    className="navbar__item" 
                    onClick={() => {
                        navigate('/profile')
                        setIsMenuOpen(!isMenuOpen)
                    }}
                >
                    Profile
                </li>
            </ul>
        </div>
      </nav>
    );
  }
  
  export default Navbar;
  