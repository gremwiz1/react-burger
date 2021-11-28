import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useLocation } from 'react-router-dom';
import style from './app-header.module.css';

function AppHeader() {

    const { pathname } = useLocation();
    return (
        <header className={style.header}>
            <NavLink exact to='/' className={`${style.constructor1} pt-4 pb-4 mr-2`}
                activeClassName={style.active}>
                <button className={style.button}>
                    <div className={`${style.icon} ml-5 mr-2`}><BurgerIcon type={pathname === '/' ? 'primary' : 'secondary'} /></div>
                    <p className={pathname === '/' ? `${style.text__button} text text_type_main-default mr-5 ${style.active}` : `${style.text__button} text text_type_main-default mr-5 text_color_inactive`}>Конструктор</p>
                </button>
            </NavLink>
            <NavLink to='/order-feed' className={`${style.constructor2} pt-4 pb-4 mr-2`}
                activeClassName={style.active}>
                <button className={style.button}>
                    <div className={`${style.icon} ml-5 mr-2`}><ListIcon type={pathname === '/order-feed' ? 'primary' : 'secondary'} /></div>
                    <p className={pathname === '/order-feed' ? `${style.text__button} text text_type_main-default mr-5 ${style.active}` : `${style.text__button} text text_type_main-default mr-5 text_color_inactive`}>Лента заказов</p>
                </button>
            </NavLink>
            <NavLink to='/' className={`${style.constructor3} mt-4 mb-4`}>
                <Logo />
            </NavLink>
            <NavLink to='/profile' className={`${style.constructor4} pt-4 pb-4`}
                activeClassName={style.active}>
                <button className={style.button}>
                    <div className={`${style.icon} ml-5 mr-2`}><ProfileIcon type={pathname === '/profile' || pathname === '/profile/orders' ? 'primary' : 'secondary'} /></div>
                    <p className={pathname === '/profile' || pathname === '/profile/orders' ? `${style.text__button} text text_type_main-default mr-5 ${style.active}` : `${style.text__button} text text_type_main-default mr-5 text_color_inactive`}>Личный кабинет</p>
                </button>
            </NavLink>
        </header>
    )
}
export default AppHeader;