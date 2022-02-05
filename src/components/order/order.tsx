import React, {FC} from 'react';
import style from './order.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { ITypeData } from '../../utils/types';

interface IObjectKeys {
    [key: string]: number;
  }
const Order : FC = () => {
    const burgerIngredients: ITypeData[] = useSelector((store: any) => store.items.items);
    const [sumOrder, setSumOrder] = React.useState(0);
    const [timeZone, setTimeZone] = React.useState('');
    const [time, setTime] = React.useState('');
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
                "createdAt": "2022-02-05T10:59:44.191Z",
                "updatedAt": "2022-02-05T10:51:44.451Z",
                "number": 9476
            },
            ],
            "total": 28752,
            "totalToday": 138};
            const [ingredientsInOrder, setIngredientsInOrder] = React.useState<ITypeData[]>([]);
            React.useEffect(() => {
                const result: IObjectKeys = {}
                mockData.orders[0].ingredients.forEach((ingredient) => {
                    if(result[ingredient]) {
                        result[ingredient]++;
                    }
                    else {
                        result[ingredient] = 1;
                    }
                })
                const resultArray: ITypeData[] = [];
                const keys = Object.keys(result)
                keys.forEach((key) => {
                    const ingredient = burgerIngredients.find((item) => item._id === key);
                    if(ingredient) {
                        ingredient.quantity = result[key];
                        resultArray.push(ingredient);
                    }
                })
                  setIngredientsInOrder(resultArray);
                  let summa = 0;
                    resultArray.forEach((ingredient) => {
                        if(ingredient.quantity) {
                            summa += ingredient.quantity * ingredient.price;
                        }
                    });
                    setSumOrder(summa);
                    const createOrderDate = new Date(mockData.orders[0].createdAt);
                    setTimeZone(`i-GMT${(createOrderDate.getTimezoneOffset() / 60 ) < 0 ? '+' : '-'}${Math.abs((createOrderDate.getTimezoneOffset() / 60 ))}`);
                    setTime(`${createOrderDate.getHours()}:${createOrderDate.getMinutes()}`);
            },[]);
    return (
        <section className={style.section}>
            <div className={style.content}>
            <p className='text text_type_digits-default mb-10'>#{mockData.orders[0].number}</p>
            <h3 className='text text_type_main-medium mb-3'>{mockData.orders[0].name}</h3>
            <p className="text text_type_main-small mb-15 text_color_success">{mockData.orders[0].status === 'done' ? 'выполнен' : 'в процессе'}</p>
            <p className='text text_type_main-medium mb-6'>Состав: </p>
            <div className={style.ingredients}>
                {ingredientsInOrder.map((data) => (
                    <div className={style.ingredient}>
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
                <p className='text text_type_main-default text_color_inactive'>Вчера, {time} {timeZone}</p>
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