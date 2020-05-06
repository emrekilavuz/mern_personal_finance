import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import Scrollchor from 'react-scrollchor';
import logo from '../img/logo.png';
import { signout } from '../auth/index.js';
const TrackMenu = (isSticky) => {
    const [burgerClick, setBurgerClick] = useState(false);
    return (
        
        <nav className={`navbar ${isSticky ? 'sticky' : ''}`}>
        <div className="container">
            <Scrollchor to="">
                <img src={logo} alt="" className="logo"/>
            </Scrollchor>
            <ul className={`nav-links ${burgerClick ? 'active' : ''}`} >
            <li>
                    <Link to="/category">Initialize</Link>
                </li>
                <li>
                    <Link to="/transactions">Transactions</Link>
                </li>
                <li>
                    <Link to="/chart">Charts</Link>
                </li>
                <li onClick={() => signout(() => {
                        console.log("signed out");
                    })}>
                        <Link to="/">Signout</Link>  
                </li>
                
            </ul>
            <div className={`burger ${burgerClick ? "toggle" : ""} `} onClick={() => setBurgerClick(!burgerClick)}>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>
        </div>
    </nav>
    
    );
};

export default TrackMenu;