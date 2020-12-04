import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from '../components/button';

const Landing = ({ history, isAuthenticated }) => {
    if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }

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

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default withRouter(connect(mapStateToProps)(Landing));
