import React, {FC} from 'react';
import style from './feed-lenta.module.css';

const FeedLenta: FC = () => {
    const mockData = {
        "success": true,
        "orders": [
            {
                "_id": "61fe56c06d7cd8001b2d4103",
                "ingredients": [
                    "60d3b41abdacab0026a733c6",
                    "60d3b41abdacab0026a733c8",
                    "60d3b41abdacab0026a733cb",
                    "60d3b41abdacab0026a733ca"
                ],
                "status": "done",
                "name": "Био-марсианский краторный люминесцентный метеоритный бургер",
                "createdAt": "2022-02-05T10:51:44.191Z",
                "updatedAt": "2022-02-05T10:51:44.451Z",
                "number": 9476
            },
            {
                "_id": "61fe56a76d7cd8001b2d4102",
                "ingredients": [
                    "60d3b41abdacab0026a733c7",
                    "60d3b41abdacab0026a733cd",
                    "60d3b41abdacab0026a733cf"
                ],
                "status": "done",
                "name": "Space флюоресцентный антарианский бургер",
                "createdAt": "2022-02-05T10:51:19.965Z",
                "updatedAt": "2022-02-05T10:51:20.206Z",
                "number": 9475
            },
            {
                "_id": "61fe51f56d7cd8001b2d40f7",
                "ingredients": [
                    "60d3b41abdacab0026a733cd",
                    "60d3b41abdacab0026a733cd",
                    "60d3b41abdacab0026a733cd",
                    "60d3b41abdacab0026a733cd",
                    "60d3b41abdacab0026a733cd",
                    "60d3b41abdacab0026a733c7"
                ],
                "status": "done",
                "name": "Space флюоресцентный бургер",
                "createdAt": "2022-02-05T10:31:17.765Z",
                "updatedAt": "2022-02-05T10:31:18.047Z",
                "number": 9474
            },
            {
                "_id": "61fe48e86d7cd8001b2d40c8",
                "ingredients": [
                    "60d3b41abdacab0026a733c7",
                    "60d3b41abdacab0026a733c9",
                    "60d3b41abdacab0026a733cd",
                    "60d3b41abdacab0026a733cf"
                ],
                "status": "done",
                "name": "Space бессмертный флюоресцентный антарианский бургер",
                "createdAt": "2022-02-05T09:52:40.373Z",
                "updatedAt": "2022-02-05T09:52:40.651Z",
                "number": 9473
            },
            {
                "_id": "61fe24b76d7cd8001b2d40a6",
                "ingredients": [
                    "60d3b41abdacab0026a733c7",
                    "60d3b41abdacab0026a733cd"
                ],
                "status": "done",
                "name": "Space флюоресцентный бургер",
                "createdAt": "2022-02-05T07:18:15.105Z",
                "updatedAt": "2022-02-05T07:18:15.399Z",
                "number": 9472
            },
            {
                "_id": "61fda4556d7cd8001b2d4084",
                "ingredients": [
                    "60d3b41abdacab0026a733c7",
                    "60d3b41abdacab0026a733cd"
                ],
                "status": "done",
                "name": "Space флюоресцентный бургер",
                "createdAt": "2022-02-04T22:10:29.490Z",
                "updatedAt": "2022-02-04T22:10:29.795Z",
                "number": 9471
            },
            {
                "_id": "61fda2786d7cd8001b2d4080",
                "ingredients": [
                    "60d3b41abdacab0026a733c7",
                    "60d3b41abdacab0026a733cd",
                    "60d3b41abdacab0026a733c7"
                ],
                "status": "done",
                "name": "Space флюоресцентный бургер",
                "createdAt": "2022-02-04T22:02:32.082Z",
                "updatedAt": "2022-02-04T22:02:32.330Z",
                "number": 9470
            },],
            "total": 28752,
            "totalToday": 138}
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