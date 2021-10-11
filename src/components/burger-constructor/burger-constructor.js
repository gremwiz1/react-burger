import React from 'react';
import { Typography, Box, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-constructor.module.css';
import data from '../../utils/data';
import ListItem from '../list-item/list-item';

function BurgerConstructor() {
    const result = data.filter(item => item.type === 'bun');


    return (

        <section className={`${style.section} mt-25 ml-4 mr-2 mb-10`}>
            <div className="mr-2"><ListItem data={result[0]} /></div>
            <div className={style.scroll}>
                {data.map((item) => (
                    item.type === "bun" ? "" :
                        <ListItem key={item._id} data={item} />
                ))}
            </div>
            <div className="mr-2"><ListItem data={result[1]} /></div>
            <div className={`${style.order} mt-6 mr-4`}>
                <div className={`${style.price_order} mr-10`}>
                    <p className={style.text_order}>610</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="large">
                    Оформить заказ
                </Button>

            </div>
        </section>


    )
}
export default BurgerConstructor;