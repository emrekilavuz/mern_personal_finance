import React, { Fragment } from 'react';
import CategoryMenu from './CategoryMenu';
import ChartBody from './ChartBody';

const ChartsPage = () => {
    return (
        <Fragment>
            <CategoryMenu/>
            <ChartBody/>
        </Fragment>
    );
};

export default ChartsPage;