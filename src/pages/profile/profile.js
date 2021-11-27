import React from 'react';
import { Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';
import { Route, Switch, NavLink, useLocation } from 'react-router-dom';
import style from './profile.module.css';
import UserProfile from '../../components/user-profile/user-profile';

function Profile() {
    const { pathname } = useLocation();
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
                    <NavLink exact to='profile/orders'
                        className={pathname === '/profile/orders'
                            ?
                            `${style.link} text text_type_main-medium ${style.active}`
                            :
                            `${style.link} text text_type_main-medium ${style.color}`} >
                        История заказов
                    </NavLink>
                    <NavLink exact to='/login' className={`${style.link} text text_type_main-medium ${style.color}`}>
                        Выход
                    </NavLink>
                </nav>
                <Switch>
                    <Route path='/profile' exact={true}>
                        <UserProfile />
                    </Route>
                    <Route path='/profile/orders' exact={true}></Route>
                    <Route path='/pofile/orders/:id' exact={true}></Route>
                </Switch>
            </div>
        </section>
    )
}
export default Profile;