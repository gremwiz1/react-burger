import React, {FC} from 'react';
import style from './order-details.module.css';
import { useSelector } from '../../services/hooks/redux-hooks';

const OrderDetails : FC = () => {
    const numberOrder = useSelector((store) => store.order.orderNumber);
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
export default OrderDetails;