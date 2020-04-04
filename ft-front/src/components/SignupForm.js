import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { signup } from '../auth/index.js';

const SignUpForm = () => {
    
    const [values, setValues] = useState({
        name : '',
        email: '',
        password: '',
        password_repeat: '',
        error: '',
        success: false
    });

    
    const {name, email, password, password_repeat, error, success} = values;

    const handleChange = name => event => {
        setValues({...values, error: false, [name] : event.target.value});
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: false});
        signup({name, email, password, password_repeat}).then(data => {
            if(data.error){
                setValues({...values, error: data.error, success: false})
            }
            else{
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    password_repeat: '',
                    error: '',
                    success: true
                });
            }
        }).catch(err => console.log(err));
        
    };

    const showError = () => (
        <div className="error" style={{display : error ? '' :'none'}}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="error" style={{display : success ? '' :'none'}}>
            New account is created...
            <Link to="/signin">Signin</Link>
        </div>
    );

    return(
    <div className="signup1">
    <div className="signup-container">

        <form id="form" className="form">
            <h2>Sign Up Form</h2>
            <div className="form-control">
                <label>Username</label>
                <input type="text" id="username" placeholder="Enter username" onChange={handleChange('name')} />
            </div>
            <div className="form-control">
                <label>Email</label>
                <input type="text" id="email" placeholder="Enter email" onChange={handleChange('email')}/>
            </div>
            <div className="form-control">
                <label>Password</label>
                <input type="password" id="password" placeholder="Enter password" onChange={handleChange('password')} />
            </div>
            <div className="form-control">
                <label>Confirm Password</label>
                <input onChange={handleChange('password_repeat')} type="password" id="password2" placeholder="Enter password again" />
            </div>
            <button onClick={clickSubmit} type="submit">Submit</button>
        </form>
        {showSuccess()}
        {showError()}
    </div>
    
    </div>
)};

export default SignUpForm;