import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './app-header.module.css';

function AppHeader() {


    return (
        <header className={style.header}>
            <nav className={`${style.constructor1} pt-4 pb-4 mr-2`}>
                <button className={style.button}>
                    <div className={`${style.icon} ml-5 mr-2`}><BurgerIcon type="primary" /></div>
                    <p className={`${style.text__button} ${style.text__color} text text_type_main-default mr-5`}>Конструктор</p>
                </button>
            </nav>
            <nav className={`${style.constructor2} pt-4 pb-4 mr-2`}>
                <button className={style.button}>
                    <div className={`${style.icon} ml-5 mr-2`}><ListIcon type="secondary" /></div>
                    <p className={`${style.text__button} text text_type_main-default mr-5 text_color_inactive`}>Лента заказов</p>
                </button>
            </nav>
            <nav className={`${style.constructor3} mt-4 mb-4`}>

                <Logo />


            </nav>
            <nav className={`${style.constructor4} pt-4 pb-4`}>
                <button className={style.button}>
                    <div className={`${style.icon} ml-5 mr-2`}><ProfileIcon type="secondary" /></div>
                    <p className={`${style.text__button} text text_type_main-default mr-5 text_color_inactive`}>Личный кабинет</p>
                </button>
            </nav>
        </header>
    )
}
export default AppHeader;