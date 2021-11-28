import React from 'react';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-constructor.module.css';
import ListItem from '../list-item/list-item';
import { useSelector, useDispatch } from 'react-redux';
import { gerOrder } from '../../services/actions/index';
import { useDrop } from "react-dnd";
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import { CLEAR_CART } from '../../services/actions/index';

function BurgerConstructor({ onDropHandler, setIsOpenModalOrder }) {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const burgerStructure = useSelector(store => store.cart.ingredients);
    const orderError = useSelector(store => store.order.orderError);
    const isLoggedIn = useSelector(store => store.user.isLoggedIn);
    const orderRequest = useSelector(store => store.order.orderRequest);
    const [priceBurger, setPriceBurger] = React.useState(0);
    const result = burgerStructure.find(item => item.type === 'bun');
    const [disable, setDisable] = React.useState(false);
    React.useEffect(() => {
        if (burgerStructure.length === 0 || orderRequest || !burgerStructure.some((item) => item.type === 'bun')) {
            setDisable(true);
        }
        else {
            setDisable(false);
        }
    }, [burgerStructure, orderRequest])
    function handleOrder() {
        const idIngredients = [];
        burgerStructure.forEach((item) => {
            if (item.type !== 'bun') {
                idIngredients.push(item._id);
            }
        });
        if (isLoggedIn) {
            dispatch(gerOrder(idIngredients));
            if (!orderError) {
                dispatch({ type: CLEAR_CART });
                setIsOpenModalOrder(true);
            }
        }
        else {
            history.push({ pathname: '/login', state: { from: location } });
        }
    }
    React.useEffect(() => {
        let result = 0;
        burgerStructure.forEach((item) => {
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
                <Button disabled={disable} type="primary" size="large" onClick={handleOrder}>
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}
BurgerConstructor.propTypes = {
    onDropHandler: PropTypes.func.isRequired,
    setIsOpenModalOrder: PropTypes.func.isRequired
}
export default BurgerConstructor;
