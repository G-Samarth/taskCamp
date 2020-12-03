import React from 'react';
import { withRouter } from 'react-router-dom';

import Button from '../components/button';

const Landing = ({ history }) => {
    return (
        <section className="landing">
            <div className="overlay">
                <div className="landing-inner">
                    <div className="my-2">
                        <h1 className="x-lg">TaskCamp</h1>
                        <p className="lead">
                            Manage tasks of a project effectively, efficiently
                            and on the actual schedule within the process of its
                            lifecycle
                        </p>
                    </div>
                    <div className="buttons">
                        <Button
                            className="btn btn-primary blur-sm"
                            onClick={() => {
                                history.push('/register');
                            }}
                        >
                            Sign Up
                        </Button>
                        <Button
                            className="btn blur-sm"
                            onClick={() => {
                                history.push('/login');
                            }}
                        >
                            Sign In
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default withRouter(Landing);
