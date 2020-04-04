import React from 'react';
import SignUpMenu from './SignupMenu.js';
import SignUpForm from './SignupForm.js';
import '../css/signup.css';


const Signup = () => {

    return (
        <div>
        <SignUpMenu/>
        <SignUpForm/>
        </div>
    );
};

export default Signup;