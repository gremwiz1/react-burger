import React, { FC } from 'react';
import { Route, Switch, NavLink, useLocation, useHistory } from 'react-router-dom';
import style from './profile.module.css';
import UserProfile from '../../components/user-profile/user-profile';
import { logout } from '../../services/actions';
import OrderInProfile from '../../components/order-in-profile/order-in-profile';
import { useDispatch, useSelector } from '../../services/hooks/redux-hooks';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../../services/actions/websocket';
import { wsUrl } from '../../utils/constants';
import { RootState } from '../../utils/types';
import { getCookie } from '../../utils/utils';
import Order from '../../components/order/order';

const Profile: FC = () => {
    const { pathname } = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(logout(() => {
            history.push('/login');
        }))
    }
    const token = getCookie('token');
    React.useEffect(() => {
        dispatch({ type: WS_CONNECTION_START, payload: { url: `${wsUrl}?token=${token}` } });
        return () => {
            dispatch({ type: WS_CONNECTION_CLOSED });
        };
    }, [dispatch, token]);
    const { orders } = useSelector((store: RootState) => store.socket.messages);
    return (
        <section className={style.section}>
            <div className={style.flex}>
                <nav className={`${style.nav} mr-15 mb-20`}>
                    <NavLink exact to='/profile'
                        className={pathname === '/profile'
                            ?
                            `${style.link} text text_type_main-medium ${style.active}`
                            :
                            `${style.link} text text_type_main-medium ${style.color}`}>
                        Профиль
                    </NavLink>
                    <NavLink exact to='/profile/orders'
                        className={pathname === '/profile/orders'
                            ?
                            `${style.link} text text_type_main-medium ${style.active}`
                            :
                            `${style.link} text text_type_main-medium ${style.color}`} >
                        История заказов
                    </NavLink>
                    <nav onClick={handleClick} className={`${style.link} text text_type_main-medium ${style.color}`}>
                        Выход
                    </nav>
                </nav>
                <Switch>
                    <Route path='/profile' exact={true}>
                        <UserProfile />
                    </Route>
                    <Route path='/profile/orders' exact={true}>
                        <div className={style.scroll}>
                            {orders ? 
                                orders.map((order) => (
                                    <OrderInProfile order={order} key={order._id} />
                                )) : ""
                            }
                        </div>
                    </Route>
                </Switch>
            </div>
        </section>
    )
}
export default Profile;