import React, { Fragment, useState, useEffect } from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import {listTen, listThirty, getAccounts} from './apiTracker';
import {isAuthenticated} from '../auth/index';


const ChartBody = () => {
    const {user, token} = isAuthenticated();
    const [chartStruct, setChartStruct] = useState({});
    const [chartStruct2, setChartStruct2] = useState({});
    const [chartStruct3, setChartStruct3] = useState({});
    const [chartStruct4, setChartStruct4] = useState({});
    
    const getData = () => {
        let dates = [];
        let prices = [];
        listTen(user._id, token).then(transactions => {
            if(transactions.error){
                console.log("error: ", transactions.error);
            } 
            else {
                transactions.map((transaction, idx) => {
                    let label = transaction.createdAt.substring(0,10);
                    if(dates.indexOf(label) === -1){
                        dates.push(label);
                        prices.push(0);
                    }
                });

                transactions.map((trnsc, i) => {
                    let label = trnsc.createdAt.substring(0,10);
                    let indexOfLabel = dates.indexOf(label);
                    if(trnsc.price < 0){
                        prices[indexOfLabel] += (trnsc.price * (-1));  
                    }
                });
            }
            console.log(dates);
            console.log(prices);
            setChartStruct({
                labels : dates,
                datasets: [{
                    label: "Expenses by days of last 10 day",
                    data: prices,
                    backgroundColor: [
                        'rgba(75,192,192,0.6)',
                        'rgba(50,50,50,1)',
                        'rgba(192,20,60,1)',
                        'rgba(192,20,192,1)',
                        'rgba(192,100,70,1)',
                        'rgba(192,192,100,1)'
                    ],
                    borderWidth: 1
                }]
            });
        });
    };

    const getData2 = () => {
        let dates = [];
        let prices = [];

        let categories_of_expenses = [];
        let prices_of_categories = [];
        listThirty(user._id, token).then(transactions => {
            if(transactions.error){
                console.log("error: ", transactions.error);
            } 
            else {
                transactions.map((transaction, idx) => {
                    let label = transaction.createdAt.substring(0,10);
                    if(dates.indexOf(label) === -1){
                        dates.push(label);
                        prices.push(0);
                    }
                });

                transactions.map((trnsc, i) => {
                    let label = trnsc.createdAt.substring(0,10);
                    let indexOfLabel = dates.indexOf(label);
                    if(trnsc.price < 0){
                        prices[indexOfLabel] += (trnsc.price * (-1));  
                    }
                });
            }
            
            setChartStruct2({
                labels : dates,
                datasets: [{
                    label: "Expenses by day of last 30 days",
                    data: prices,
                    backgroundColor: [
                        'rgba(75,192,192,0.6)',
                        'rgba(50,50,50,1)',
                        'rgba(192,20,60,1)',
                        'rgba(192,20,192,1)',
                        'rgba(192,100,70,1)',
                        'rgba(192,192,100,1)'
                    ],
                    borderWidth: 1
                }]
            });

            transactions.map((one_t, indexx) => {
                if(categories_of_expenses.indexOf(one_t.category.name) === -1){
                    categories_of_expenses.push(one_t.category.name);
                    prices_of_categories.push(0);
                }
            });

            transactions.map((onee_t) => {
                let index_of_category = categories_of_expenses.indexOf(onee_t.category.name);
                if(onee_t.price < 0){
                prices_of_categories[index_of_category] += onee_t.price * (-1); 
                }
            });

            setChartStruct3({
                labels : categories_of_expenses,
                datasets: [{
                    label: "Expenses by categories",
                    data: prices_of_categories,
                    backgroundColor: [
                        'rgba(44,34,129,1)',
                        'rgba(143,0,0,1)',
                        'rgba(192,20,60,1)',
                        'rgba(192,20,192,1)',
                        'rgba(25,49,7,1)',
                        'rgba(25,49,7,1)'
                    ],
                    borderWidth: 1
                }]
            });
        });
    };

    const getData3 = () => {
        let types = [];
        let amounts = [];
        getAccounts(user._id, token).then(account_response => {
            if(account_response.error){
                console.log(account_response.error);
            }
            else {
                account_response.map((account) => {
                    if(types.indexOf(account.account_type) === -1 ){
                        types.push(account.account_type);
                        amounts.push(0);
                    }
                });

                account_response.map(accountt => {
                    let index_of_amount = types.indexOf(accountt.account_type);
                    amounts[index_of_amount] += accountt.account_amount * accountt.coefficient;
                });

                setChartStruct4({
                    labels : types,
                    datasets: [{
                        data: amounts,
                        backgroundColor: [
                            'rgba(75,192,192,0.6)',
                            'rgba(92,210,86,1)',
                            'rgba(192,20,60,1)',
                            'rgba(192,20,192,1)',
                            'rgba(192,100,70,1)',
                            'rgba(192,192,100,1)'
                        ],
                        borderWidth: 1
                    }]
                });
            }
        });
    }


    useEffect(() => {
        getData();
        
    }, []);

    useEffect(() => {
        getData2();
        
    }, []);

    useEffect(() => {
        getData3();
        
    }, []);

    return (
        <Fragment>
            <h2>Charts</h2>
            <div style={{maxHeight: '66%', maxWidth: '66%'}}>
            <Bar data={chartStruct} options={{responsive: true, scales : {
                yAxes: [
                    {
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 10,
                            beginAtZero: true
                        }
                    }
                ]
            }}} />
            </div>

            <div style={{maxHeight: '66%', maxWidth: '66%'}}>
            <Bar data={chartStruct2} options={{responsive: true, 
            scales : {
                yAxes: [
                    {
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 20,
                            beginAtZero: true
                        }
                    }
                ]
            }}} />
            </div>

            <div style={{maxHeight: '66%', maxWidth: '66%'}}>
                <Pie data={chartStruct3} options = {{
                    title : {
                        display : true,
                        text : "Transactions by categories of last 30 days"
                    }, 
                    legend : {
                        position : "bottom"
                    }
                }}/>
            </div>

            <div style={{maxHeight: '66%', maxWidth: '66%'}}>
                <Pie data={chartStruct4} options = {{
                    title : {
                        display : true,
                        text : "Accounts by types"
                    }, 
                    legend : {
                        position : "bottom"
                    }
                }}/>
            </div>
        </Fragment>
    );
};

export default ChartBody;

