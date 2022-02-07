import React, { FC } from 'react';
import style from './order.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { ITypeData } from '../../utils/types';
import { amountOrderAndQuantityIngredients, setTimeLocalRu } from '../../utils/utils';

const Order: FC = () => {
    const burgerIngredients: ITypeData[] = useSelector((store: any) => store.items.items);
    const [sumOrder, setSumOrder] = React.useState(0);
    const [timeZone, setTimeZone] = React.useState('');
    const [time, setTime] = React.useState('');
    const [timeDay, setTimeDay] = React.useState('');
    const [statusOrder, setStatusOrder] = React.useState('');
    const mockData = {
        "success": true,
        "orders": [
            {
                "_id": "61fe56c06d7cd8001b2d4103",
                "ingredients": [
                    "60d3b41abdacab0026a733c6",
                    "60d3b41abdacab0026a733c8",
                    "60d3b41abdacab0026a733cb",
                    "60d3b41abdacab0026a733cb",
                    "60d3b41abdacab0026a733ca"
                ],
                "status": "done",
                "name": "Био-марсианский краторный люминесцентный метеоритный бургер",
                "createdAt": "2022-02-03T10:59:44.191Z",
                "updatedAt": "2022-02-05T10:51:44.451Z",
                "number": 9476
            },
        ],
        "total": 28752,
        "totalToday": 138
    };
    const [ingredientsInOrder, setIngredientsInOrder] = React.useState < ITypeData[] > ([]);
    React.useEffect(() => {
        const amountAndArray = amountOrderAndQuantityIngredients(burgerIngredients, mockData.orders[0].ingredients)
        setIngredientsInOrder(amountAndArray.resultArray);
        setSumOrder(amountAndArray.amount);
        const timeLocal = setTimeLocalRu(mockData.orders[0].createdAt);
        setTimeZone(timeLocal.timeZone);
        setTime(timeLocal.time);
        setTimeDay(timeLocal.timeDay);
        const status = mockData.orders[0].status;
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
    }, []);
    return (
        <section className={style.section}>
            <div className={style.content}>
                <p className='text text_type_digits-default mb-10'>#{mockData.orders[0].number}</p>
                <h3 className='text text_type_main-medium mb-3'>{mockData.orders[0].name}</h3>
                <p className="text text_type_main-small mb-15 text_color_success">{statusOrder}</p>
                <p className='text text_type_main-medium mb-6'>Состав: </p>
                <div className={style.ingredients}>
                    {ingredientsInOrder.map((data, index) => (
                        <div className={style.ingredient} key={index}>
                            <div className={style.leftPart}>
                                <img className={`${style.image} ml-6 mr-5`} src={data.image} alt={data.name} />
                                <p>{data.name}</p>
                            </div>
                            <div className={style.rightPart}>
                                <p className='text text_type_digits-default mr-2 ml-4'>{data.quantity} x {data.price}</p>
                                <CurrencyIcon type='primary' />
                            </div>
                        </div>
                    ))}
                </div>
                <div className={style.date}>
                    <p className='text text_type_main-default text_color_inactive'>{timeDay}, {time} {timeZone}</p>
                    <div className={style.price}>
                        <p className='text text_type_digits-default mr-2'>{sumOrder}</p>
                        <CurrencyIcon type='primary' />
                    </div>
                </div>
            </div>

        </section>
    )
};
export default Order;