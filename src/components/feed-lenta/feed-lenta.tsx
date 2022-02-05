import React, {FC} from 'react';
import style from './feed-lenta.module.css';

const FeedLenta: FC = () => {
    return (
        <section className={style.content}>
            <div className={`${style.section} mr-15`}>
            <h1 className={`${style.title} mt-10 mb-1 text text_type_main-large`}>Лента заказов</h1>
            <div className={style.scroll}></div>
            </div>
            <div className={style.content2}>
                <div className={style.ordersNumbers}>
                    <div className={style.orders}>
                        <p className='text text_type_main-medium mb-6'>Готовы:</p>
                        <div className={style.orders}>
                            <p className='text text_type_digits-default mt-2 text_color_success'>034533</p>
                            <p className='text text_type_digits-default mt-2 text_color_success'>034533</p>
                        </div>
                    </div>
                    <div className={style.orders}>
                    <p className='text text_type_main-medium mb-6'>В работе:</p>
                    <div className={style.orders}>
                            <p className='text text_type_digits-default mt-2'>034533</p>
                            <p className='text text_type_digits-default mt-2'>034533</p>
                        </div>
                    </div>
                </div>
                <p className='text text_type_main-medium mt-15'>Выполнено за все время:</p>
                <p className='text text_type_digits-large'>28752</p>
                <p className='text text_type_main-medium mt-15'>Выполнено за сегодня:</p>
                <p className='text text_type_digits-large'>138</p>
            </div>
        </section>
    )
};
export default FeedLenta;