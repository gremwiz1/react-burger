import React from 'react';
import { Typography, Box, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-constructor.module.css';
import ListItem from '../list-item/list-item';
import { useSelector, useDispatch } from 'react-redux';
import { gerOrder } from '../../services/actions/index';
import { useDrop } from "react-dnd";
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function BurgerConstructor({ onDropHandler }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const burgerStructure = useSelector(store => store.cart.ingredients);
    const isLoggedIn = useSelector(store => store.user.isLoggedIn);
    const [priceBurger, setPriceBurger] = React.useState(0);
    const result = burgerStructure.find(item => item.type === 'bun');
    function handleOrder() {
        const idIngredients = [];
        burgerStructure.forEach((item) => {
            if (item.type !== 'bun') {
                idIngredients.push(item._id);
            }
        });
        if (isLoggedIn) {
            dispatch(gerOrder(idIngredients));
        }
        else {
            history.push('/login');
        }
    }
    React.useEffect(() => {
        let result = 0;
        burgerStructure.map((item) => {
            if (item.type !== 'bun') {
                result += item.price;
            }
        });
        const bun = burgerStructure.find(item => item.type === 'bun');
        if (bun) {
            result += bun.price * 2;
        }
        setPriceBurger(result);
    }, [burgerStructure]);
    const [{ isHover }, dropTarget] = useDrop({
        accept: "ingredient",
        drop(itemId) {
            onDropHandler(itemId);
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });
    const border = isHover ? '1px solid lightgreen' : '1px solid transparent';


    return (

        <section className={`${style.section} mt-25 ml-4 mr-2 mb-10`} ref={dropTarget} style={{ border }}>
            {result ? <div className="mr-2"><ListItem data={{ ...result, name: result.name + "\n(верх)" }} isCart={false} isUp={true} /></div> : ""}
            <div className={style.scroll}>
                {burgerStructure.map((item, index) => (
                    item.type === "bun" ? "" :
                        <ListItem key={index} data={item} index={index} isCart={true} />
                ))}
            </div>
            {result ? <div className="mr-2"><ListItem data={{ ...result, name: result.name + "\n(низ)" }} isCart={false} isUp={false} /></div> : ""}
            <div className={`${style.order} mt-6 mr-4`}>
                <div className={`${style.price_order} mr-10`}>
                    <p className={`text text_type_digits-default ${style.text_order}`}>{priceBurger}</p>
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
    onDropHandler: PropTypes.func.isRequired
}
export default BurgerConstructor;
