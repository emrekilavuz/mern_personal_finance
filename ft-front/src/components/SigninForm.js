import React, { useState } from 'react';
import {Redirect } from 'react-router-dom';
import {signin, authenticate, isAuthenticated} from '../auth/index.js';




const SignInForm = () => {
    
        const [values, setValues] = useState({
            email: '',
            password: '',
            password_repeat: '',
            error: '',
            loading: false,
            redirectToReferrer: false
        });
        
        const {user} = isAuthenticated();
        
        const {email, password, error, loading, redirectToReferrer} = values;
    
        const handleChange = name => event => {
            setValues({...values, error: false, [name] : event.target.value});
        };
    
        const clickSubmit = (event) => {
            event.preventDefault();
            setValues({...values, error: false, loading: true});
            signin({email, password }).then(data => {
                if(data.error){
                    setValues({...values, error: data.error, loading: false})
                }
                else{
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            loading: false,
                            redirectToReferrer: true
    
                        });
                    });
                }
            });
            
        };
    
        const showError = () => (
            <div className="error" style={{display : error ? '' :'none'}}>
                {error}
            </div>
        );
    
        const showLoading = () => (
            loading && (<div className="success" style={{background:"green", color:"white"}}><h2>Loading...</h2></div>)
        );

        const redirectUser = () => {
            if(redirectToReferrer){
                if(user && user.role === 1){
                    return <Redirect to="/admin/dashboard"/>
                }else{
                    return <Redirect to="/tracker"/> 
                }
                
            }
        };

    return (
        <div className="signup1">
        <div className="signup-container">

            <form id="form" className="form">
                <h2>Login Form</h2>
                <div className="form-control">
                    <label>Email</label>
                    <input onChange={handleChange('email')} type="text" id="username" placeholder="Enter email" />
                </div>
                <div className="form-control">
                    <label>Password</label>
                    <input onChange={handleChange('password')} type="password" id="password" placeholder="Enter password" />
                </div>
                <button onClick={clickSubmit} className="btn">Login</button>
            </form>
            {showLoading()}
            {showError()}
            {redirectUser()}
        </div>
    </div>
    );
}

export default SignInForm;