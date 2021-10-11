import React from 'react';
import { Typography, Box, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import style from './burger-constructor.module.css';

import ListItem from '../list-item/list-item';

function BurgerConstructor({ data }) {
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
BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string,
            name: PropTypes.string,
            type: PropTypes.string,
            proteins: PropTypes.number,
            fat: PropTypes.number,
            carbohydrates: PropTypes.number,
            calories: PropTypes.number,
            price: PropTypes.number,
            image: PropTypes.string,
            image_mobile: PropTypes.string,
            image_large: PropTypes.string
        })
    )
}
export default BurgerConstructor;
