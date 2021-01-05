import React from 'react';
import spinner from '../assets/loading.gif';

const Spinner = () => (
    <div className="spinner-div">
        <img src={spinner} className="spinner" alt="Loading..." />
    </div>
);

export default Spinner;
