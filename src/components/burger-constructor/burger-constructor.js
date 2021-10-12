import React from 'react';
import { Typography, Box, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import style from './burger-constructor.module.css';
import typeData from '../../utils/types';
import ListItem from '../list-item/list-item';

function BurgerConstructor({ data, openModalIngredient, openModalOrder }) {
    const result = data.find(item => item.type === 'bun');
    function handleOrder() {
        openModalOrder();
    }
    return (

        <section className={`${style.section} mt-25 ml-4 mr-2 mb-10`}>
            <div className="mr-2"><ListItem data={{ ...result, name: result.name + "\n(верх)" }} isCart={false} isUp={true} openModalIngredient={openModalIngredient} /></div>
            <div className={style.scroll}>
                {data.map((item) => (
                    item.type === "bun" ? "" :
                        <ListItem key={item._id} data={item} isCart={true} openModalIngredient={openModalIngredient} />
                ))}
            </div>
            <div className="mr-2"><ListItem data={{ ...result, name: result.name + "\n(низ)" }} isCart={false} isUp={false} openModalIngredient={openModalIngredient} /></div>
            <div className={`${style.order} mt-6 mr-4`}>
                <div className={`${style.price_order} mr-10`}>
                    <p className={`text text_type_digits-default ${style.text_order}`}>610</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="large" onClick={handleOrder}>
                    Оформить заказ
                </Button>

            </div>
        </section>


    )
}
BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape(typeData).isRequired
    )
}
export default BurgerConstructor;
