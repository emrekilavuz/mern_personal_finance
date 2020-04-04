import React, { Fragment, useState, useEffect } from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import {listTen} from './apiTracker';
import {isAuthenticated} from '../auth/index';
const moment = require('moment');


const ChartBody = () => {
    const {user, token} = isAuthenticated();
    const [chartStruct, setChartStruct] = useState({});

    const date = new Date();
    console.log(date);
    console.log(typeof date.toString());
    let date2 = moment().format();
    console.log(date2);

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
                        'rgba(192,20,60,1)',
                        'rgba(192,100,70,1)',
                        'rgba(192,192,100,1)'
                    ],
                    borderWidth: 1
                }]
            });
        });
    };

   


    useEffect(() => {
        getData();
        
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
        </Fragment>
    );
};

export default ChartBody;

