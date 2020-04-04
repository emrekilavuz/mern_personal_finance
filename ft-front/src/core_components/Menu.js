import React, {useState, useRef, useEffect} from 'react';
import {withRouter, Link } from 'react-router-dom';
import Scrollchor from 'react-scrollchor';
import PropTypes from 'prop-types';
import logo1 from '../img/logo.png';
import { signout, isAuthenticated } from '../auth/index.js';

const Menu = ({isSticky, history}) => {
    const [burgerClick, setBurgerClick] = useState(false);
    
    
    return (
        <nav className={`navbar ${isSticky ? 'sticky' : ''}`}>
        <div className="container">
            <Scrollchor to="">
                <img src={logo1} alt="" className="logo"/>
            </Scrollchor>
            <ul className={`nav-links ${burgerClick ? 'active' : ''}`} >
                <li><Scrollchor to="#features">Features</Scrollchor></li>
                <li><Scrollchor to="#about">About</Scrollchor></li>
                <li><Scrollchor to="#testimonials">Testimonials</Scrollchor></li>
                <li><Scrollchor to="#contact">Contact</Scrollchor></li>

                {(isAuthenticated() && (
                    <li className="signout" onClick={() => signout(() => {
                        history.push("/");
                    })}>
                        Sign Out
                </li>
                ))}

                {!isAuthenticated() && (
                    <button type="submit" className="login">
                    <Link to="/signin">Login</Link>
                </button>
               
                )}
                {!isAuthenticated() && (
                    <button type="submit" className="signup">
                    <Link to="/signup">Sign Up</Link>
                    </button>
                )}

               
                
               
            </ul>
            <div className={`burger ${burgerClick ? "toggle" : ""} `} onClick={() => setBurgerClick(!burgerClick)}>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>
        </div>
    </nav>
    );
}
   
   
Menu.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
    hash: PropTypes.string,
    state: PropTypes.any,
    key: PropTypes.string
  }).isRequired
};


export default withRouter(Menu);