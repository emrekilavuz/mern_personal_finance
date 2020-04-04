import React from 'react';
import logo from '../img/logo.png';
import {Link} from 'react-router-dom';
const CategoryMenu = () => {
    return (
            <nav>
            <img src={logo} alt="" className="logo" style={{width: "160px", height:"50px"}}/>
            <ul>
                <li><Link to="/tracker">Tracker</Link></li>
                <li><Link to="/category">Category</Link></li>
                <li><Link to="/transactions">Transactions</Link></li>
                <li><Link to="/chart">Charts</Link></li>
            </ul>
            </nav>
    );
}

export default CategoryMenu;