import React, {FC} from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from '../../services/hooks/redux-hooks';
import { RootState } from '../../utils/types';

interface IProtectedRoute {
    path: string,
    exact: boolean
}
const ProtectedRoute: FC<IProtectedRoute>= ({ children, ...rest }) => {
    const isLoggedIn = useSelector((store: RootState) => store.user.isLoggedIn);

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
