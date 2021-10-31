import React from 'react';
import { Typography, Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import style from './ingredient.module.css';
import typeData from '../../utils/types';
import { useDispatch } from 'react-redux';
import { OPEN_MODAL_INGREDIENT, ADD_INGREDIENT } from '../../services/actions/index';

function Ingredient({ data }) {
    const [count, setCount] = React.useState(1);
    const dispatch = useDispatch();
    function handleClick() {
        dispatch({ type: ADD_INGREDIENT, item: data });
        dispatch({ type: OPEN_MODAL_INGREDIENT });
    }
    return (


        <div onClick={handleClick} className={style.card}>
            <img className={`${style.image} pl-4 pr-4 mb-1`} src={data.image} alt={data.name} />
            <div className={`${style.price} mb-1`}>
                <p className={`${style.digits} text text_type_digits-default`}>{data.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`${style.name} text text_type_main-default`}>{data.name}</p>
            <Counter count={count} size="default" />
        </div>



    )
}
Ingredient.propTypes = {
    data: PropTypes.shape(typeData).isRequired,
    openModalIngredient: PropTypes.func.isRequired
}
export default Ingredient;