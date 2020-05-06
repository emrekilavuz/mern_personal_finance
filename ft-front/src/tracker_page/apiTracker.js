import {API} from '../config';


export const createAccount = (userId, token, accountName, initialAmount, account_type) => {
    let coefficient = 1;
    if(account_type === "USD"){
        coefficient = 6.73;
    }
    else if(account_type === "EURO"){
        coefficient = 7.28;
    }

    else if(account_type === "GBP"){
        coefficient = 8.26;
    }

    else if(account_type === "AUG"){
        coefficient = 350;
    }

    else if(account_type === "BTC"){
        coefficient = 45729;
    }
    return fetch(`${API}/account/create/${userId}`, {
        method: "POST",
        headers: {
            Accept : "application/json",
            "Content-type" : "application/json",
            Authorization : `Bearer ${token}`
        },
        body: JSON.stringify({"account_title" : accountName, "account_amount": initialAmount, "account_type" : account_type, "whichUser": userId, "coefficient" : coefficient})
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const listThirty = (userId, token) => {
    return fetch(`${API}/transaction/listThirty/${userId}`, {
        method: "GET",
        headers: {
            Authorization : `Bearer ${token}`
        }
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err);
    });
};

export const listTen = (userId, token) => {
    return fetch(`${API}/transaction/listTen/${userId}`, {
        method: "GET",
        headers: {
            Authorization : `Bearer ${token}`
        }
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err);
    });
};

export const deleteTransactionn = (userId, token, transactionId) => {
    return fetch(`${API}/transaction/${transactionId}/${userId}`, {
        method : "DELETE",
        headers: {
            Authorization : `Bearer ${token}`
        }
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err);
    });
};

export const getUserProfileBalance = (userId, token) => {
    return fetch(`${API}/secret/${userId}`, {
        method: "GET",
        headers: {
            Authorization : `Bearer ${token}`
        }
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err);
    });
};


export const updateNetBalance = (userId, token, account_data) => {
    let netBalance = 0;
    account_data.map((account, idx) => {
        netBalance += account.account_amount * account.coefficient;
    });
            
    return fetch(`${API}/secret/updateBalance/${userId}`, {
        method: 'PUT',
        headers: {
            "Content-Type" : "application/json",
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ "netBalance" : netBalance})
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

export const getTransactionsOfWeek = (userId, token) => {
    return fetch(`${API}/transaction/thisWeek/${userId}`, {
        method: "GET",
        headers: {
            Authorization : `Bearer ${token}`
        }
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err);
    });
};


export const getTransactionsOfMonth = (userId, token) => {
    return fetch(`${API}/transaction/thisMonth/${userId}`, {
        method: "GET",
        headers: {
            Authorization : `Bearer ${token}`
        }
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err);
    });
};


export const getTransactionsOfDay = (userId, token) => {
    return fetch(`${API}/transaction/thisDay/${userId}`, {
        method: "GET",
        headers: {
            Authorization : `Bearer ${token}`
        }
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err);
    });
};


// This function increments or decrements the account balance by amount  
export const updateAccountAmountClient = (accountId, userId, token, amount) => {
    //console.log(typeof amount);
    amount = Number(amount);
    //console.log(typeof amount);
    return fetch(`${API}/account/updateAmount/${accountId}/${userId}`, {
        method: 'PUT',
        headers: {
            "Content-Type" : "application/json",
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ "account_amount" : amount})
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getAccounts = (userId, token) => {
    return fetch(`${API}/account/getByUser/${userId}`, {
        method: "GET",
        headers: {
            Authorization : `Bearer ${token}`
        }
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err);
    });
};


export const getTransactions = (userId) => {
    return fetch(`${API}/transaction/listSome/${userId}`, {
        method: "GET"
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err);
    });
};

export const getCategories = (userId) => {
    return fetch(`${API}/categories/${userId}`, {
        method: "GET"
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err);
    });
};


export const createTransaction = (userId, token, transaction) => {
    return fetch(`${API}/transaction/create/${userId}`, {
        method: "POST",
        headers: {
            Accept : "application/json",
            Authorization : `Bearer ${token}`
        },
        body: transaction
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/createCategory/${userId}`, {
        method: "POST",
        headers: {
            Accept : "application/json",
            "Content-type" : "application/json",
            Authorization : `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};