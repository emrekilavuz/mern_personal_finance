import React, {Fragment, useState, useEffect, useRef} from 'react';
import {getTransactionsOfWeek, deleteTransactionn, updateAccountAmountClient, updateNetBalance, getAccounts} from './apiTracker';
import {isAuthenticated} from '../auth/index';
import ShowImage from './ShowImage';
import {Link} from 'react-router-dom';

import {  AlertDialog,  AlertDialogLabel,  AlertDialogDescription,  AlertDialogOverlay,  AlertDialogContent} from "@reach/alert-dialog";



const TranBody = () => {
    const [currentPrice, setCurrentPrice] = useState("");
    const [lastClickedId, setLastClickedId] = useState("");
    const [currentAccount, setCurrentAccount] = useState("");
    const {user, token} = isAuthenticated();
    const [error, setError] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [accounts, setAccounts] = useState("");
    const cancelRef = useRef();
    const [showDialog, setShowDialog] = useState(false);
    const myAlertDialog = () => (
        <AlertDialog style={{margin:"2rem", padding: "2rem", color:"red", border:"1px solid"}} isOpen={showDialog} leastDestructiveRef={cancelRef}>          
        <AlertDialogLabel><h2>Please Confirm!</h2></AlertDialogLabel>          
        <AlertDialogDescription style={{color:"orange", margin:"1rem"}}> Delete transaction with reflecting the account, delete without
            reflecting the account or dont delete? </AlertDialogDescription>          
            <div className="alert-buttons" style={{padding:"1rem"}}>            
            <button style={{padding:"1rem", margin:".5rem"}} onClick={reflectAccountAndDelete}>Reflect the account and delete</button>{" "}            
            <button style={{padding: "1rem", margin :".5rem"}} onClick={deleteTransactionn_request}>Delete without reflecting</button>{" "} 
            <button style={{padding: "1rem", margin:".5rem"}} onClick={() => setShowDialog(false)}>Don't delete</button></div>        
        </AlertDialog>
    ); 

    const reflectAccountAndDelete = () => {
        updateAccountAmountClient(currentAccount, user._id, token, currentPrice)
        .then(update_response => {
            if(update_response.error){
                setError(update_response.error);
            }
            else {
                deleteTransactionn(user._id, token,lastClickedId).then(delete_response => {
                    if(delete_response.error){
                        setError(delete_response.error);
                    } else {
                        getTransactionsOfWeek(user._id, token)
                        .then(datat => {
                            if(datat.error){
                            setError(datat.error);
                            } else {
                                getAccounts(user._id, token).then(dataa => {
                                    if (dataa.error){
                                        setError(dataa.error);
                                    }
                                    else {
                                        updateNetBalance(user._id, token, dataa).then(unb_response=>{
                                            if(unb_response.error){
                                                setError(unb_response.error);
                                            }
                                            else {
                                                setAccounts(dataa);
                                                setTransactions(datat);
                                                setShowDialog(false);
                                            }
                                        })
                                    }
                                })
                            
                            }
                        })
                    }
                })
            }
        })
    }

    const deleteTransactionn_request = () => {
        deleteTransactionn(user._id, token, lastClickedId).then(delete_response => {
            if(delete_response.error){
                setError(delete_response.error);
            }
            else {
                getTransactionsOfWeek(user._id, token)
                    .then(datat => {
                        if(datat.error){
                            setError(datat.error);
                        }
                        else {
                            setTransactions(datat);
                            setShowDialog(false);
                        }
                    });
                }
        });
    }

    const handleAlert = (transactionId, transactionPrice, transactionAccount) => {
        setLastClickedId(transactionId);
        setCurrentPrice(transactionPrice * (-1));
        setCurrentAccount(transactionAccount);
        //console.log(lastClickedId);
        setShowDialog(!showDialog);
    }
    const showError = () => (
        <div style={{ display: error ? "" : "none" }}>{error}</div>
      );
    
    
    
    const init = () => {
        getTransactionsOfWeek(user._id, token)
        .then(data => {
            if(data.error){
                setError(data.error);
            }
            else {
                setTransactions(data);
            }
        });
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <div>
            {showDialog && myAlertDialog()}
            <h2>Transactions</h2>
            {showError()}
            
            <div style={{display: "flex", flexDirection:"row", flexWrap : "wrap"}}>
            {transactions && transactions.map( (transaction, i) => { 
                return (
                    <div key={i} style={{flex: "1 0 30%", padding:"1px", margin: "1px", textAlign:"center", maxWidth: "33%"}}>
                    <h2>{transaction.title}</h2>
                    <ShowImage item={transaction} url="transaction"/>
                    <h4>{transaction.description}</h4>
                    <h3>{transaction.price} TL</h3>
                    <h4>Date : {transaction.createdAt.substring(0,10)}</h4>
                    <Link to="/updatetrn"><button style={{padding: "1rem", margin: "1rem"}}>Update Transaction</button></Link>
                    <button style={{padding: "1rem", margin: "1rem"}} onClick={() => handleAlert(transaction._id, transaction.price, transaction.whichAccount)}>Delete Transaction</button>
                </div>
                );
               
             })}
            </div>

        </div>
    );
};

export default TranBody;

