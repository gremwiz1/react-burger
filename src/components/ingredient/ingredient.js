import React from 'react';
import { Typography, Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import style from './ingredient.module.css';
import typeData from '../../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ADD_INGREDIENT } from '../../services/actions/index';
import { useDrag } from "react-dnd";

function Ingredient({ data }) {
    const history = useHistory();
    const ingredientsInBurger = useSelector(store => store.cart.ingredients);
    const [count, setCount] = React.useState(0);
    const { _id } = data;
    const dispatch = useDispatch();
    function handleClick() {
        dispatch({ type: ADD_INGREDIENT, item: data });
        history.push({
            pathname: `/ingredients/${data._id}`,
            state: { background: { pathname: '/' } },
        });
    }
    const [{ isDrag }, dragRef] = useDrag({
        type: "ingredient",
        item: { _id },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });
    React.useEffect(() => {
        const result = { qty: 0 };
        ingredientsInBurger.forEach((item) => {
            if (item._id === data._id) {
                result.qty++;
            }
        });
        setCount(result.qty);
    }, [ingredientsInBurger]);
    return (!isDrag &&
        <div onClick={handleClick} className={style.card} ref={dragRef}>
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
}
export default Ingredient;