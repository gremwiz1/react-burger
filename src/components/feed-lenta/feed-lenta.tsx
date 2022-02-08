import React, { FC } from 'react';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../../services/actions/websocket';
import { useDispatch, useSelector } from '../../services/hooks/redux-hooks';
import { wsUrl } from '../../utils/constants';
import { ITypeOrder, RootState } from '../../utils/types';
import OrderInFeed from '../order-in-feed/order-in-feed';
import style from './feed-lenta.module.css';

const FeedLenta: FC = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch({ type: WS_CONNECTION_START, payload: { url: `${wsUrl}/all` } });
        return () => {
            dispatch({ type: WS_CONNECTION_CLOSED });
        };
    }, [dispatch]);
    const { orders, total, totalToday } = useSelector((store: RootState) => store.socket.messages);
    const [ordersDone, setOrdersDone] = React.useState < ITypeOrder[] > ([]);
    const [ordersPending, setOrdersPending] = React.useState < ITypeOrder[] > ([]);
    React.useEffect(() => {
        const resultOrdersDone: ITypeOrder[] = [];
        const resultOrdersPending: ITypeOrder[] = [];
        orders.forEach((order) => {
            if (order.status === 'done') {
                resultOrdersDone.push(order);
            }
            else if (order.status === 'pending') {
                resultOrdersPending.push(order);
            }
        })
        const resultSortedOrdersDone = resultOrdersDone.sort((a, b) => a.number - b.number);
        const resultSortedOrdersPending = resultOrdersPending.sort((a, b) => a.number - b.number);
        setOrdersDone(resultSortedOrdersDone.slice(0, 10));
        setOrdersPending(resultSortedOrdersPending.slice(0, 10));
    }, [orders]);
    return (
        <section className={style.content}>
            <div className={`${style.section} mr-15`}>
                <h1 className={`${style.title} mt-10 mb-1 text text_type_main-large`}>Лента заказов</h1>
                <div className={style.scroll}>
                    {
                        orders.map((order, index) => (
                            <OrderInFeed order={order} key={order._id} />
                        ))
                    }
                </div>
            </div>
            <div className={style.content2}>
                <div className={style.ordersNumbers}>
                    <div className={style.orders}>
                        <p className='text text_type_main-medium mb-6'>Готовы:</p>
                        <div className={style.orders}>
                            {
                                ordersDone.map((order) => (
                                    <p className='text text_type_digits-default mt-2 text_color_success' key={order._id}>{order.number}</p>
                                ))
                            }
                        </div>
                    </div>
                    <div className={style.orders}>
                        <p className='text text_type_main-medium mb-6'>В работе:</p>
                        <div className={style.orders}>
                            {
                                ordersPending.map((order) => (
                                    <p className='text text_type_digits-default mt-2' key={order._id}>{order.number}</p>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <p className='text text_type_main-medium mt-15'>Выполнено за все время:</p>
                <p className='text text_type_digits-large'>{total}</p>
                <p className='text text_type_main-medium mt-15'>Выполнено за сегодня:</p>
                <p className='text text_type_digits-large'>{totalToday}</p>
            </div>
        </section>
    )
};
export default FeedLenta;