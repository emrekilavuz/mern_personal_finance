import React, {useState} from 'react';
import {isAuthenticated} from '../auth/index';
import {createCategory} from './apiTracker';

const CategoryBody = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const {user, token} = isAuthenticated();

    const showSuccess = () => {
        if(success){
        return <h3>{name} is created</h3>;
        }
    };

    const showError = () => {
        if(error) {
        return (<h3>{name} could not created</h3>);
        }
    };

    const handleChange = e => {
        setError(false);
        setName(e.target.value);
    };

    const clickSubmit = e => {
        let userId = user._id;
        e.preventDefault();
        setError(false);
        setSuccess(false);
        createCategory(userId, token, {"name": name, "whichUser" : userId}).then(data=>{
            if(data.error){
                setError(data.error);
            } else {
                setError("");
                setSuccess(true);

            }
        }); 
    }

    const newCategoryForm = () => (
        <div >
        <form onSubmit={clickSubmit}>
                <input type="text" onChange={handleChange} value={name} style = {{width : "70%"}} required/>
            <button>Add Category</button>
        </form>
        </div>
    );

    return (
        <section>
            {showSuccess()}
            {showError()}
            {newCategoryForm()}
        </section>
            
    
        
    );

}

export default CategoryBody;
