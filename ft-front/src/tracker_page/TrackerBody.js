import React, { useState, useEffect, Fragment } from "react";
import { isAuthenticated } from "../auth/index";
import { createTransaction, getCategories, getAccounts, updateAccountAmountClient, getTransactionsOfWeek, updateNetBalance, getUserProfileBalance } from "./apiTracker";

const TrackerBody = () => {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    categories: [],
    transactions_data: [],
    accounts: [],
    whichUser: "",
    whichAccount: "",
    positive_trns : 0,
    negative_trns: 0,
    net_balance: 0,
    photo: "",
    loading: false,
    error: "",
    createdTransaction: '',
    formData: ""
  });

  const {
    title,
    description,
    price,
    category,
    categories,
    transactions_data,
    accounts,
    whichAccount,
    whichUser,
    positive_trns,
    negative_trns,
    net_balance,
    loading,
    error,
    createdTransaction,
    formData
  } = values;

  const showError = () => (
    <div style={{ display: error ? "" : "none" }}>{error}</div>
  );

  const showSuccess = () => (
  <div style={{display: createdTransaction ? '' : 'none'}}><h2>{`${createdTransaction} is created`}</h2></div>
  );

  const showLoading = () => (
    <div style={{ display: loading ? "" : "none" }}><h2>Creating the transaction</h2></div>
  );

  const init = () => {
    let positive_s = 0;
    let negative_s = 0;
    console.log("init çalıştı");
    getCategories(user._id).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        getTransactionsOfWeek(user._id, token).then(datat => {
            if (datat.error) {
              setValues({ ...values, error: datat.error });
            } else {
              getAccounts(user._id, token).then(dataa => {
                if(dataa.error){
                  setValues({ ...values, error: datat.error });
                }
                else{
                  updateNetBalance(user._id, token, dataa).then(update_balance_response => {
                    if(update_balance_response.error){
                      setValues({ ...values, error: update_balance_response.error });
                    }
                    else {
                      getUserProfileBalance(user._id, token).then(dataupb => {
                        if(dataupb.error){
                          setValues({ ...values, error: dataupb.error });
                        }else {
                          datat.map((one_t, i) => {
                            if(one_t.price >= 0){
                              positive_s += one_t.price;
                            }
                            else{
                              negative_s += one_t.price;
                            }
                          });
                  setValues({ ...values, net_balance: dataupb.user.netBalance, positive_trns: positive_s, negative_trns: negative_s, transactions_data : datat, categories: data, accounts: dataa, formData: new FormData()});
    
                        }
                      });
                    }
                  })
                 
                 

                }
              })
            }
          });
        //setValues({ ...values, categories: data,  });
        
      }
    });
    
  };

  useEffect(() => {
    init();
  }, []); 
 

  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    let positive_ss = 0;
    let negative_ss = 0;
    setValues({
      ...values,
      error: "",
      loading: true,
      formData: formData.append("whichUser", user._id)
    });
    //.append("whichAccount", account_id)
    createTransaction(user._id, token, formData).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        updateAccountAmountClient(whichAccount, user._id, token, price).then(datau => {
          if(datau.error){
            setValues({ ...values, error: datau.error });
          }else {
            getTransactionsOfWeek(user._id, token).then(datat => {
              if (datat.error) {
                setValues({ ...values, error: datat.error });
              }else{
                getAccounts(user._id, token).then(dataa => {
                  if(dataa.error){
                    setValues({ ...values, error: dataa.error });
                  }
                  else {
                    updateNetBalance(user._id, token, dataa).then(dataun => {
                        if(dataun.error){
                          setValues({ ...values, error: dataun.error });
                        }else {
                          datat.map((one_t, i) => {
                            if(one_t.price >= 0){
                              positive_ss += one_t.price;
                            }
                            else{
                              negative_ss += one_t.price;
                            }
                          });
                          setValues({
                            ...values,
                            title: "",
                            description: "",
                            photo: "",
                            price: "",
                            net_balance: dataun.netBalance,
                            transactions_data: datat,
                            positive_trns: positive_ss, 
                            negative_trns: negative_ss,
                            accounts: dataa,
                            loading: false,
                            createdTransaction: datat.title
                          });
                        }
                    });
                    
                  }
                });
                
              }
            
          });
        }
    });
  }
});
  };

  return (
      <div className="tracker">
        

        <div className="tracker-container">
        <div style={{marginBottom : "1rem"}}><h2>Expense Tracker</h2></div>
          <h4>Balance</h4>

          <h1 id="balance" className="balance">
            {net_balance} ₺
          </h1>

          <div className="inc-exp-container">
            <div>
              <h4>Income</h4>
              <p id="money-plus" className="money plus">
                {positive_trns} ₺
              </p>
            </div>
            <div>
              <h4>Expense</h4>
              <p id="money-minus" className="money minus">
                {negative_trns} ₺
              </p>
            </div>
          </div>

          <h3>Add New Transaction</h3>

          <form id="form" onSubmit={clickSubmit}>
            <div className="form-control">
              <label htmlFor="text">Transaction Title</label>
              <input
                onChange={handleChange("title")}
                type="text"
                value={title}
                id="text"
                placeholder="Enter transaction title"
              />
            </div>
            <div className="form-control">
              <label>
                Amount <br /> (- expense) <br /> (+ income)
              </label>
              <input
                onChange={handleChange("price")}
                type="number"
                id="amount"
                placeholder="Enter amount"
                value={price}
              />
            </div>
            <div>
              <label>Transaction Description</label>
              <textarea
                onChange={handleChange("description")}
                value={description}
              />
            </div>
            <div>
              <label>Transaction image</label>
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image/*"
              />
            </div>
            <div>
              <label>Transaction Category</label>
              <select onChange={handleChange("category")}>
                <option>Select please below...</option>
                {categories &&
                  categories.map((c, i) => (
                    <option key={i} value={c._id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label>Which Account</label>
              <select onChange={handleChange("whichAccount")}>
                <option>Select please below...</option>
                {accounts &&
                  accounts.map((c, i) => (
                    <option key={i} value={c._id}>
                      {c.account_title} &nbsp; &nbsp; &nbsp; ----->>>>&nbsp;&nbsp;&nbsp;&nbsp; {c.account_amount} &nbsp; {c.account_type}
                    </option>
                  ))}
              </select>
            </div>
            <button className="btn">Add Transaction</button>
          </form>
          {showLoading()}
          {showError()}
          {showSuccess()}

          <h3>Transactions History</h3>

          <ul id="list" className="list">
              {transactions_data && transactions_data.map((trnsc, i) => 
                  (<li key={i} className="minus">{trnsc.title}
                  <span>{trnsc.price}₺</span>
                  <button className="delete-btn">x</button>
                  </li>)
              )}
          </ul>
        </div>
      </div>
  );
};

export default TrackerBody;
