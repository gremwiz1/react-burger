import React from 'react';
import { Typography, Box, DragIcon, CurrencyIcon, LockIcon, DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './list-item.module.css';

function ListItem({ data }) {
    return (
        <section className={`${style.section} mb-4 mr-2`}>
            {data.type === 'bun' ? <div className="mr-8"></div> : <div className="mr-2"><DragIcon type="primary" /></div>}
            <div className={style.element}>
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
export default ListItem;