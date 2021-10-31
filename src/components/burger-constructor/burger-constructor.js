import React from 'react';
import { Typography, Box, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-constructor.module.css';
import ListItem from '../list-item/list-item';
import { useSelector, useDispatch } from 'react-redux';
import { gerOrder } from '../../services/actions/index';

function BurgerConstructor() {
    const dispatch = useDispatch();
    const burgerStructure = useSelector(store => store.items.items);
    const [priceBurger, setPriceBurger] = React.useState(0);
    const result = burgerStructure.find(item => item.type === 'bun');
    const data = burgerStructure.filter(item => item.type !== 'bun');
    function handleOrder() {
        const idIngredients = [];
        burgerStructure.forEach((item) => {
            if (item.type !== 'bun') {
                idIngredients.push(item._id);
            }
        });
        dispatch(gerOrder(idIngredients));
    }
    React.useEffect(() => {
        let result = 0;
        burgerStructure.map((item) => {
            if (item.type !== 'bun') {
                result += item.price;
            }
        });
        const bun = burgerStructure.find(item => item.type === 'bun');
        result += bun.price * 2;
        setPriceBurger(result);
    }, [burgerStructure]);
    return (

        <section className={`${style.section} mt-25 ml-4 mr-2 mb-10`}>
            {result ? <div className="mr-2"><ListItem data={{ ...result, name: result.name + "\n(верх)" }} isCart={false} isUp={true} /></div> : ""}
            <div className={style.scroll}>
                {data.map((item) => (
                    item.type === "bun" ? "" :
                        <ListItem key={item._id} data={item} isCart={true} />
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
export default BurgerConstructor;
