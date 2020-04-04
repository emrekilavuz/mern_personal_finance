import React, { Fragment } from 'react';
import Scrollchor from 'react-scrollchor';
import logo from '../img/logo.png';
import {signout} from '../auth/index';
import {Link} from 'react-router-dom';
const UMenu = () => {
    return (
        <Fragment>
            <nav style={{display: "flex"}}>
            <Scrollchor to="">
                <img src={logo} alt="" className="logo" style={{height: "60px", width:"150px"}}/>
            </Scrollchor>
                <ul>
                    <li className="signout" onClick={() => signout(() => {
                    console.log("signed out");
                })}>
                
                <Link to="/">Signout</Link>
            </li>
                </ul>
            </nav>
        </Fragment>
    );
}

export default UMenu;