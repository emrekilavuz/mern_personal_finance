import React, { Fragment } from 'react';
import {isAuthenticated} from '../auth/index';
const UBody = () => {

    const {user: {name, email, role}} = isAuthenticated();

    return (
        <Fragment>
            <div>
                <h2>User Information</h2>
                <ul>
                    <li>
                        {name}
                    </li>
                    <li>
                        {email}
                    </li>
                    <li>
                        {role === 1 ? "Admin" : "Registered user"}
                    </li>
                </ul>
            </div>        
        </Fragment>
    );
}

export default UBody;