import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../redux/auth/auth.actions';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    return (
        <div className="navbar bg-dark">
            <h1 className="logo">
                <Link to={isAuthenticated ? '/profile' : '/'}>TaskCamp</Link>
            </h1>
            <nav>
                <ul>
                    <li>
                        <Link to="#">About</Link>
                    </li>
                    {!loading &&
                        (isAuthenticated ? (
                            <li>
                                <Link onClick={logout}>Logout</Link>
                            </li>
                        ) : (
                            <Fragment>
                                <li>
                                    <Link to="/register">Register</Link>
                                </li>
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                            </Fragment>
                        ))}
                </ul>
            </nav>
        </div>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
