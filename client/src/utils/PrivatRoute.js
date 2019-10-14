import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import checkAuth from "../hoc/checkAuth";

const PrivateRoute = ({ component: Component, ...rest }) => {
    return(
        <Route {...rest} render={props => (
            localStorage.token ? (
                <Component {...props} />
            ) : (
                <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }}
                />
            )
        )} />
    );
};

export default checkAuth(PrivateRoute);
