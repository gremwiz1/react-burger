import React, { FC } from 'react';
import style from './order.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ITypeData, ITypeOrder, RootState } from '../../utils/types';
import { amountOrderAndQuantityIngredients, setTimeLocalRu } from '../../utils/utils';
import { useDispatch, useSelector } from '../../services/hooks/redux-hooks';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../../services/actions/websocket';
import { wsUrl } from '../../utils/constants';
import { useParams } from 'react-router-dom';

const Order: FC = () => {
    const { id } = useParams < { id: string } > ();
    const dispatch = useDispatch();
    const { orders } = useSelector((store: RootState) => store.socket.messages);
    const { wsConnected } = useSelector((store: RootState) => store.socket);
    React.useEffect(() => {
        dispatch({ type: WS_CONNECTION_START, payload: { url: `${wsUrl}/all` } });
        return () => {
            dispatch({ type: WS_CONNECTION_CLOSED });
        };
    }, [dispatch]);
    const burgerIngredients: ITypeData[] = useSelector((store: RootState) => store.items.items);
    let statusOrder = "";
    let ingredientsInOrder: ITypeData[] = [];
    let timeLocal = {
        time: "",
        timeDay: "",
        timeZone: ""
    };
    let sumOrder = 0;
    let order: ITypeOrder = {
        "_id": "",
        "ingredients": [],
        "status": "",
        "name": "",
        "createdAt": "",
        "updatedAt": "",
        "number": 0
    }
    if (orders && wsConnected && burgerIngredients) {
        const orderFindById = orders.find((order) => order._id === id);
        if (orderFindById) {
            order = orderFindById;
            const amountAndArray = amountOrderAndQuantityIngredients(burgerIngredients, order.ingredients);
            timeLocal = setTimeLocalRu(order.createdAt);
            const status = order.status;
            ingredientsInOrder = amountAndArray.resultArray;
            sumOrder = amountAndArray.amount;
            switch (status) {
                case 'done': statusOrder = ('Выполнен');
                    break;
                case 'created': statusOrder = ('Создан');
                    break;
                case 'pending': statusOrder = ('Готовится');
                    break;
                case 'cancelled': statusOrder = ('Отменен');
                    break;
                default: statusOrder = ('Неизвестно');
                    break;
            }
        }
    }
    return (
        <section className={style.section}>
            <div className={style.content}>
                <p className='text text_type_digits-default mb-10'>#{order.number}</p>
                <h3 className='text text_type_main-medium mb-3'>{order.name}</h3>
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
                    <p className='text text_type_main-default text_color_inactive'>{timeLocal.timeDay}, {timeLocal.time} {timeLocal.timeZone}</p>
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