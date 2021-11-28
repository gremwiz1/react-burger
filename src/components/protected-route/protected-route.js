import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children, ...rest }) => {
    const isLoggedIn = useSelector(store => store.user.isLoggedIn);
    return (
        <Route {...rest}
            render={({ location }) =>
                isLoggedIn ? (
                    children
                ) : (
                    <Redirect to={{ pathname: '/login', state: { from: location } }} />
                )
            }
        />
    );
};
export default ProtectedRoute;
ProtectedRoute.propTypes = {
    children: PropTypes.element.isRequired,
};