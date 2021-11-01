import React from 'react';
import { Typography, Box, DragIcon, CurrencyIcon, LockIcon, DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import style from './list-item.module.css';
import typeData from '../../utils/types';
import { useSelector, useDispatch } from 'react-redux';
import { OPEN_MODAL_INGREDIENT, ADD_INGREDIENT, DELETE_ITEM_ON_INDEX, CHANGE_ORDER_INGREDIENT_IN_BURGER } from '../../services/actions/index';
import { useDrag, useDrop } from "react-dnd";

function ListItem({ data, isCart, isUp, index }) {
    const dispatch = useDispatch();
    const ingredientsInBurger = useSelector(store => store.cart.ingredients);
    function handleClick() {
        dispatch({ type: ADD_INGREDIENT, item: data });
        dispatch({ type: OPEN_MODAL_INGREDIENT });
    }
    function deleteClick() {
        dispatch({ type: DELETE_ITEM_ON_INDEX, index: index })
    }
    const [{ isDrag }, dragRef] = useDrag({
        type: "sauce and main",
        item: { index },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });
    const [{ isHover }, dropTarget] = useDrop({
        accept: "sauce and main",
        drop(itemId) {
            onDropHandler(itemId);
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });
    function onDropHandler(id) {
        const result = [];
        for (let i = 0; i < ingredientsInBurger.length; i++) {
            if (i === id.index) {
                result[i] = ingredientsInBurger[index];
            }
            else if (i === index) {
                result[i] = ingredientsInBurger[id.index];
            } else {
                result[i] = ingredientsInBurger[i];
            }
        }
        dispatch({ type: CHANGE_ORDER_INGREDIENT_IN_BURGER, ingredients: result })
    }
    const border = isHover ? '1px solid lightgreen' : '1px solid transparent';
    return (!isDrag &&
        <section ref={data.type === 'bun' ? null : dragRef} className={`${style.section} mb-4 mr-2`} style={{ border }}>
            {data.type === 'bun' ? <div className="mr-8"></div> : <div className="mr-2"><DragIcon type="primary" /></div>}
            <div ref={data.type === 'bun' ? null : dropTarget} className={isCart ? style.element_cart : isUp ? style.element_up : style.element_down}>
                <div className={style.left} onClick={handleClick}>
                    <img className={`${style.image} ml-6 mr-5`} src={data.image} alt={data.name} />
                    <p className={`${style.name} text text_type_main-default mr-5`}>{data.name}</p>
                </div>
                <div className={`${style.right} pr-8`}>
                    <div className={`${style.price} mr-5`}>
                        <p className="text text_type_digits-default">{data.price}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    {data.type === 'bun' ? <LockIcon type="secondary" /> : <DeleteIcon type="primary" onClick={deleteClick} />}
                </div>
            </div>
        </section>
    )
}
ListItem.propTypes = {
    data: PropTypes.shape(typeData).isRequired,
    isCart: PropTypes.bool.isRequired,
    isUp: PropTypes.bool,
    index: PropTypes.number
}
export default ListItem;