import React from 'react';
import { Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import style from './order-details.module.css';
import { useSelector } from 'react-redux';

function OrderDetails() {
    const numberOrder = useSelector(store => store.order.orderNumber);
    return (
        <section className={`${style.order} mt-4`}>
            <h2 className={`${style.content} text text_type_digits-large mb-8`}>{numberOrder}</h2>
            <p className={`${style.content} mb-15 text text_type_main-medium`}>идентификатор заказа</p>
            <div className={style.image}></div>
            <p className={`${style.content} mt-15 text text_type_main-default`}>Ваш заказ начали готовить"</p>
            <p className={`${style.content} mt-2 mb-30 text text_type_main-default text_color_inactive`}>Дождитесь готовности на орбитальной станции</p>
        </section>

    )
};
OrderDetails.propTypes = {
    order: PropTypes.shape({
        number: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        wait: PropTypes.string.isRequired,
    }).isRequired,

}
export default OrderDetails;