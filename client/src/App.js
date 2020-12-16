import React, { Fragment, useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import './App.css';

import Navbar from './components/navbar';
import Footer from './components/footer';
import Landing from './pages/landing';
import Login from './pages/login';
import Register from './pages/register';
import Alert from './components/alert';
import ProfilePage from './pages/profile';
import PrivateRoute from './components/routing/private-route';
import ProjectForm from './components/project-form';
import ProjectPage from './pages/project';

import { Provider } from 'react-redux';
import store from './redux/store';

import { loadUser } from './redux/auth/auth.actions';
import { setAuthToken } from './redux/auth/auth.utils';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = ({ location }) => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <Fragment>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <section class="container">
                        <Alert />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <PrivateRoute
                            exact
                            path="/dashboard"
                            component={ProfilePage}
                        />
                        <PrivateRoute
                            exact
                            path="/dashboard/:projectId"
                            component={ProjectPage}
                        />
                        <PrivateRoute
                            exact
                            path="/add-project"
                            component={ProjectForm}
                        />
                    </section>
                </Switch>
                {location.pathname !== '/' && <Footer />}
            </Fragment>
        </Provider>
    );
};

export default withRouter(App);
