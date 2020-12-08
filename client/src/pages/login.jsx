import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { login } from '../redux/auth/auth.actions';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        login({ email, password });
    };

    if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <Fragment>
            <div className="form-background p-4 my-2 border-3 blur-lg">
                <h1 className="lg text-dark">Sign In</h1>
                <p className="lead">
                    <i className="fas fa-user"></i> Sign into Your Account
                </p>
                <form className="form" onSubmit={(e) => onSubmit(e)}>
                    <div className="form-group">
                        <input
                            className="blur-sm"
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={email}
                            onChange={(e) => onChange(e)}
                            required
                        />
                        <label for="email" className="form-label">
                            Email Address
                        </label>
                    </div>
                    <div className="form-group">
                        <input
                            className="blur-sm"
                            type="password"
                            placeholder="Password"
                            name="password"
                            minlength="6"
                            value={password}
                            onChange={(e) => onChange(e)}
                            required
                        />
                        <label for="password" className="form-label">
                            Password
                        </label>
                    </div>
                    <input
                        type="submit"
                        class="btn btn-primary blur-sm"
                        value="Login"
                    />
                </form>
            </div>
            <div className="form-text">
                <p className="sm">
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
