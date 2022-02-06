import React, { FC } from 'react';
import style from './order-in-feed.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { ITypeData, ITypeOrder } from '../../utils/types';
import { amountOrderAndQuantityIngredients, setTimeLocalRu } from '../../utils/utils';

interface IOrderInFeed {
    order: ITypeOrder
}
const OrderInFeed: FC<IOrderInFeed> = ({order}) => {
    const burgerIngredients: ITypeData[] = useSelector((store: any) => store.items.items);
    const [timeZone, setTimeZone] = React.useState('');
    const [time, setTime] = React.useState('');
    const [timeDay, setTimeDay] = React.useState('');
    const [sumOrder, setSumOrder] = React.useState(0);
    const [ingredientsInOrder, setIngredientsInOrder] = React.useState < ITypeData[] > ([]);
    React.useEffect(() => {
        const timeLocal = setTimeLocalRu(order.createdAt);
        setTimeZone(timeLocal.timeZone);
        setTime(timeLocal.time);
        setTimeDay(timeLocal.timeDay);
        const amountAndArray = amountOrderAndQuantityIngredients(burgerIngredients, order.ingredients);
        if (amountAndArray.resultArray.length > 5) {
            setIngredientsInOrder(amountAndArray.resultArray.slice(0, 5));
        }
        else {
            setIngredientsInOrder(amountAndArray.resultArray);
        }
        setSumOrder(amountAndArray.amount);
    }, [])
    return (
        <section className={style.section}>
            <div className={style.top}>
                <p className='text text_type_digits-default'>#{order.number}</p>
                <p className='text text_type_main-default text_color_inactive'>{timeDay}, {time} {timeZone}</p>
            </div>
            <p className='text text_type_main-medium mb-6 mt-6 pr-6 pl-6'>{order.name}</p>
            <div className={style.bottom}>
                <div className={style.images}>
                    {
                        ingredientsInOrder.map((ingredient, index) => (
                            <img className={`${style.image} ml-6 mr-5`} key={index} src={ingredient.image} alt={ingredient.name} />
                        )
                        )
                    }
                </div>
                <div className={style.price}>
                    <p className='text text_type_digits-default mr-2'>{sumOrder}</p>
                    <CurrencyIcon type='primary' />
                </div>
            </div>
        </section>
    )
};
export default OrderInFeed;
