import React from 'react';
import { Typography, Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './ingredient.module.css';

function Ingredient({ data }) {
    const [count, setCount] = React.useState(0);
    return (
        <div className={style.card}>
            <img className={`${style.image} pl-4 pr-4 mb-1`} src={data.image} alt={data.name} />
            <div className={`${style.price} mb-1`}>
                <p className={`${style.digits} text text_type_digits-default`}>{data.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`${style.name} text text_type_main-default`}>{data.name}</p>
        </div>
    )
}
export default Ingredient;