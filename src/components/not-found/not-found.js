import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './not-found.module.css';

function NotFound() {
    const history = useHistory();
    function handleClickLink() {
        history.goBack();
    }
    return (
        <section className={style.section}>
            <h1 className="text text_type_main-default mb-6">404</h1>
            <p className="text text_type_main-default mb-6">Страница не найдена</p>
            <Link to="" onClick={handleClickLink} className="text text_type_main-default">Назад</Link>
        </section>
    )
};
export default NotFound;