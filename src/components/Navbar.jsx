import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import UseScrollPosition from '../hooks/UseScrollPosition';
import logo from '../assets/logo/logo-main.svg';
import menuOpen from '../assets/svg/nav-hamburger-bars.svg';
import menuClose from '../assets/svg/close-x.svg';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const navigate = useNavigate();
    const shadow = UseScrollPosition();
    console.log(shadow)

    const closeNavbarHandler = () => {
        if(isMenuOpen) {
            setIsMenuOpen(!isMenuOpen)
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
                    fill="green"
                />
        </div>
        <div 
            className={isMenuOpen ? "body__background__navbar--open" : "body__background__navbar--close"}
            onClick={closeNavbarHandler}
        >
        </div>
        <img 
                src={menuClose} 
                alt="menu toggle" 
                className={isMenuOpen ? "navbar__toggle-cross--open" : "navbar__toggle-cross--close" } 
                onClick={() => {
                    setIsMenuOpen(!isMenuOpen)
                }}
            />
        <div className={isMenuOpen ? "navbar__links" : "navbar__links navbar__links--close"}>    
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
  