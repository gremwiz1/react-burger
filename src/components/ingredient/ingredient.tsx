import React, {FC} from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './ingredient.module.css';
import { ITypeData } from '../../utils/types';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useDrag } from "react-dnd";

interface IIngredient {
    data: ITypeData
}

const Ingredient: FC<IIngredient> = ({ data }) => {
    const history = useHistory();
    const ingredientsInBurger = useSelector((store: any) => store.cart.ingredients);
    const [count, setCount] = React.useState(0);
    const { _id } = data;
    function handleClick() {
        history.push({
            pathname: `/ingredients/${data._id}`,
            state: { background: { pathname: '/' } },
        });
    }
    const [{ isDrag }, dragRef] = useDrag({
        type: "ingredient",
        item: { _id },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });
    React.useEffect(() => {
        const result = { qty: 0 };
        ingredientsInBurger.forEach((item: ITypeData) => {
            if (item._id === data._id) {
                result.qty++;
            }
        });
        if (data.type === 'bun') {
            setCount(result.qty * 2);
        }
        else {
            setCount(result.qty);
        }
    }, [ingredientsInBurger, data._id, data.type]);
    return (isDrag ? <>""</> :
        <div onClick={handleClick} className={style.card} ref={dragRef}>
            <img className={`${style.image} pl-4 pr-4 mb-1`} src={data.image} alt={data.name} />
            <div className={`${style.price} mb-1`}>
                <p className={`${style.digits} text text_type_digits-default`}>{data.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`${style.name} text text_type_main-default`}>{data.name}</p>
            <Counter count={count} size="default" />
        </div>
        
    )
}

export default Ingredient;