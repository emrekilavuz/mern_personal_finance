import React from 'react';
import {Link, withRouter } from 'react-router-dom';
import logosi from '../img/logo.png';

const SignUpMenu = () => (
    <nav className="navbar">
        <div className="container">
            <Link to="/">
                <img src={logosi} alt="logo" className="logo"/>
            </Link>
            <ul className="nav-links">
                <button type="submit" className="login">
                    <Link to="/signin">Login</Link>
                </button>
                <button type="submit" className="signup">
                    <Link to="/signup">Sign Up</Link>
                </button>
            </ul>
            <div className="burger">
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>
        </div>
    </nav>

);


export default withRouter(SignUpMenu);