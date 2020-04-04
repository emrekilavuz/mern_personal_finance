import React, {Fragment, useState, useEffect} from 'react';
import CategoryMenu from './CategoryMenu';
import TranBody from './TranBody';
import '../css/tran.css';

const TransactionsPage = () => {
    return (
        <Fragment>
            <CategoryMenu/>
            <TranBody/>
        </Fragment>
    );
}

export default TransactionsPage;