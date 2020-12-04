import React, { Fragment } from 'react';
import spinner from '../assets/loading.gif';

const Spinner = () => (
    <Fragment>
        <img src={spinner} className="spinner" alt="Loading..." />
    </Fragment>
);

export default Spinner;
