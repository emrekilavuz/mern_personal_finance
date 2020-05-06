import React, {useState} from 'react';
import {isAuthenticated} from '../auth/index';
import {createCategory, createAccount} from './apiTracker';

const CategoryBody = () => {
    const [name, setName] = useState("");
    const [accountName, setAccountName] = useState("");
    const [initialAmount, setInitialAmount] = useState(0);
    const [accountType, setAccountType] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [success2, setSuccess2] = useState(false);

    const {user, token} = isAuthenticated();

    const showSuccess = () => {
        if(success){
        return <h3>{name} is created</h3>;
        }
    };

    const showSuccess2 = () => {
        if(success2){
        return <h3>{accountName} is created</h3>;
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

    const handleAccountInput = e => {
        setAccountName(e.target.value);
    }

    const handleAccountAmountInput = e => {
        setInitialAmount(Number(e.target.value));
    }

    const handleAccountTypeSelect = e => {
        setAccountType(e.target.value);
    }

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
    };

    const createAccountSubmit = (e) => {
        let userId = user._id;
        e.preventDefault();
        setError(false);
        setSuccess2(false);
        createAccount(userId, token, accountName, initialAmount, accountType).then(accountResponse => {
            if(accountResponse.error){
                setError(accountResponse.error);
            }
            else {
                setSuccess2(true);
                setAccountName("");
                setInitialAmount(0);
            }
        })
    }

    const newCategoryForm = () => (
        <div>
        <form onSubmit={clickSubmit}>
            <label>Category Name</label>
                <input type="text" onChange={handleChange} value={name} style = {{width : "50%"}} required/>
            <button>Add Category</button>
        </form>
        </div>
    );

    const newAccountForm = () => {
        return (
            <div style={{display: "flex", flexDirection : "column", justifyContent: "center"}}>
                <form onSubmit={createAccountSubmit}>
                    <label>Account Name</label>
                    <input type="text" onChange={handleAccountInput} value={accountName} style = {{width : "50%"}} required/>
                    <label>Account Initial Amount</label>
                    <input type="number" onChange={handleAccountAmountInput} value={initialAmount} style = {{width : "50%"}} required/>
                    <label>Account Type</label>
                    <br/>
                    <select onChange={handleAccountTypeSelect} style = {{width : "50%"}} required>
                        <option>Please select below</option>
                        <option value="TL">TL</option>
                        <option value="USD">USD</option>
                        <option value="EURO">EURO</option>
                        <option value="GBP">GBP</option>
                        <option value="AUG">AUG</option>
                        <option value="BTC">BTC</option>
                    </select>
                    <br/>
                    <button>Add Account</button>
                </form>
            </div>
        );
    };

    return (
        <section>
            {showSuccess()}
            {showSuccess2()}
            {showError()}
            {newCategoryForm()}
            {newAccountForm()}
        </section>
            
    
        
    );

}

export default CategoryBody;
