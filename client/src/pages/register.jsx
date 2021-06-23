import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { setAlert } from '../redux/alert/alert.actions';
import { register } from '../redux/auth/auth.actions';

const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
        userType: '',
    });

    const { name, email, password, password2, userType } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Passwords Do Not Match', 'danger');
        } else {
            register({ name, email, userType, password });
        }
    };

    if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <Fragment>
            <div className="width-normal">
                <div className="form-background p-4 border-3 my-1 blur-lg">
                    <h1 className="lg text-dark">Sign Up</h1>
                    <p className="lead">
                        <i className="fas fa-user"></i> Create Your Account
                    </p>
                    <form className="form" onSubmit={(e) => onSubmit(e)}>
                        <div className="form-group">
                            <input
                                className="blur-sm"
                                type="text"
                                placeholder="Name"
                                name="name"
                                value={name}
                                onChange={(e) => onChange(e)}
                                required
                            />
                            <label className="form-label">Name</label>
                        </div>
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
                            <label className="form-label">Email Address</label>
                        </div>
                        <div className="form-group">
                            <input
                                className="blur-sm"
                                list="userTypes"
                                name="userType"
                                id="userType"
                                placeholder="Job Title"
                                value={userType}
                                onChange={(e) => onChange(e)}
                                required
                            />
                            <datalist id="userTypes">
                                <option value="Manager">Manager</option>
                                <option value="Lead">Lead</option>
                                <option value="Resource">Resource</option>
                            </datalist>
                            <label className="form-label">Job Title</label>
                        </div>
                        <div className="form-group">
                            <input
                                className="blur-sm"
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={(e) => onChange(e)}
                                minLength="6"
                                required
                            />
                            <label className="form-label">Password</label>
                        </div>
                        <div className="form-group">
                            <input
                                className="blur-sm"
                                type="password"
                                placeholder="Confirm Password"
                                name="password2"
                                value={password2}
                                onChange={(e) => onChange(e)}
                                minLength="6"
                                required
                            />
                            <label className="form-label">
                                Confirm Password
                            </label>
                        </div>
                        <input
                            type="submit"
                            className="btn btn-primary blur-sm"
                            value="Register"
                        />
                    </form>
                </div>
                <div className="form-text">
                    <p className="my-1 sm">
                        Already have an account?{' '}
                        <Link to="/login">Sign In</Link>
                    </p>
                    <small className="xs">
                        * Set your profile image from the dashboard
                    </small>
                </div>
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
