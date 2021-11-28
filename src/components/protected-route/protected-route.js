import React from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children, ...routeProps }) => {
    const { isLoggedIn } = useSelector(store => store.user.isLoggedIn);
    const location = useLocation();
    return isLoggedIn ? <Route {...routeProps} /> : <Redirect to={{ pathname: '/login', state: { from: location } }} />;
};
export default ProtectedRoute;
ProtectedRoute.propTypes = {
    children: PropTypes.element.isRequired,
};