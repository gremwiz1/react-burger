import React, { FC } from 'react';
import style from './order-in-profile.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ITypeData, ITypeOrder, RootState } from '../../utils/types';
import { amountOrderAndQuantityIngredients, setTimeLocalRu } from '../../utils/utils';
import { useSelector } from '../../services/hooks/redux-hooks';
import { Link } from 'react-router-dom';

interface IOrderInProfile {
    order: ITypeOrder
}
const OrderInProfile: FC<IOrderInProfile> = ({ order }) => {
    const burgerIngredients: ITypeData[] = useSelector((store: RootState) => store.items.items);
    const [timeZone, setTimeZone] = React.useState('');
    const [time, setTime] = React.useState('');
    const [timeDay, setTimeDay] = React.useState('');
    const [sumOrder, setSumOrder] = React.useState(0);
    const [ingredientsInOrder, setIngredientsInOrder] = React.useState < ITypeData[] > ([]);
    const [statusOrder, setStatusOrder] = React.useState('');
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
        const status = order.status;
        switch (status) {
            case 'done': setStatusOrder('Выполнен');
                break;
            case 'created': setStatusOrder('Создан');
                break;
            case 'pending': setStatusOrder('Готовится');
                break;
            case 'cancelled': setStatusOrder('Отменен');
                break;
            default: setStatusOrder('Неизвестно');
                break;
        }
    }, [])
    return (
        <Link className={style.link} to={{ pathname: `/profile/orders/${order._id}`, state: { background: { pathname: `/profile/orders/${order._id}` } } }}>
            <section className={style.section}>
                <div className={style.top}>
                    <p className='text text_type_digits-default'>#{order.number}</p>
                    <p className='text text_type_main-default text_color_inactive'>{timeDay}, {time} {timeZone}</p>
                </div>
                <p className='text text_type_main-medium mb-2 mt-6 pr-6 pl-6'>{order.name}</p>
                <p className={statusOrder === 'Выполнен' ? `text text_type_main-small mb-6 text_color_success pr-6 pl-6` : `text text_type_main-small mb-6 pr-6 pl-6`}>{statusOrder}</p>
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
        </Link>
    )
};
export default OrderInProfile;
