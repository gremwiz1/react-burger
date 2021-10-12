import React from 'react';
import { Typography, Box, DragIcon, CurrencyIcon, LockIcon, DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import style from './list-item.module.css';
import typeData from '../../utils/types';

function ListItem({ data, isCart, isUp }) {
    return (
        <section className={`${style.section} mb-4 mr-2`}>
            {data.type === 'bun' ? <div className="mr-8"></div> : <div className="mr-2"><DragIcon type="primary" /></div>}
            <div className={isCart ? style.element_cart : isUp ? style.element_up : style.element_down}>
                <div className={style.left}>

                    <img className={`${style.image} ml-6 mr-5`} src={data.image} alt={data.name} />
                    <p className={`${style.name} text text_type_main-default mr-5`}>{data.name}</p>
                </div>
                <div className={`${style.right} pr-8`}>
                    <div className={`${style.price} mr-5`}>
                        <p className="text text_type_digits-default">{data.price}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    {data.type === 'bun' ? <LockIcon type="secondary" /> : <DeleteIcon type="primary" />}
                </div>
            </div>


        </section>
    )
}
ListItem.propTypes = {
    data: PropTypes.shape(typeData).isRequired,
    isCart: PropTypes.bool.isRequired,
    isUp: PropTypes.bool
}
export default ListItem;