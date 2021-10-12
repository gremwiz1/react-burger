import React from 'react';
import { Typography, Box, CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './modal.module.css';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import data from '../../utils/data';

function Modal({ isIngredient, closeModal, ingredientModal }) {
    function handleClick() {
        closeModal();
    }
    return (
        <section className={style.section}>
            <div className={`${style.container} pl-10 pt-10 pr-10`}>
                <h2 className={`${style.title} text text_type_main-large`}>{isIngredient ? "Детали ингредиента" : ""}</h2>
                <CloseIcon type="primary" onClick={handleClick} />
            </div>
            {isIngredient ? <IngredientDetails data={ingredientModal} />
                :
                <OrderDetails order={data} />}
        </section>
    )
};
export default Modal;