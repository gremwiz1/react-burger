import React, {FC} from 'react';
import { DragIcon, CurrencyIcon, LockIcon, DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './list-item.module.css';
import { ITypeData, RootState } from '../../utils/types';
import { DELETE_ITEM_ON_INDEX, CHANGE_ORDER_INGREDIENT_IN_BURGER } from '../../services/actions/index';
import { useDrag, useDrop } from "react-dnd";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks/redux-hooks';

interface IListItem {
    data: ITypeData,
    isCart: boolean,
    isUp?: boolean,
    index?: number
}
const ListItem: FC<IListItem> = ({ data, isCart, isUp, index }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const ingredientsInBurger = useSelector((store: RootState) => store.cart.ingredients);
    function handleClick(e: React.MouseEvent) {
        e.preventDefault();
        history.push({
            pathname: `/ingredients/${data._id}`,
            state: { background: { pathname: '/' } },
        });
    }
    function deleteClick() {
        dispatch({ type: DELETE_ITEM_ON_INDEX, index: index })
    }
    const [{ isDrag }, dragRef] = useDrag({
        type: "sauce and main",
        item: { index },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });
    const [{ isHover }, dropTarget] = useDrop({
        accept: "sauce and main",
        drop(itemId: {index: number}) {
            onDropHandler(itemId);
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });
    function onDropHandler(id: {index:number}) {
        const result = [];
        for (let i = 0; i < ingredientsInBurger.length; i++) {
            result[i] = ingredientsInBurger[i];
        }
        const dropItem = ingredientsInBurger[id.index];
        if(index) {
            if (id.index > index) {
                result.splice(index, 0, dropItem);
                result.splice(id.index + 1, 1);
            }
            else if (id.index < index) {
                result.splice(index + 1, 0, dropItem);
                result.splice(id.index, 1);
            }
        }
        dispatch({ type: CHANGE_ORDER_INGREDIENT_IN_BURGER, ingredients: result })
    }
    const border = isHover ? '1px solid lightgreen' : '1px solid transparent';
    return (isDrag ? <>""</> :
        <section ref={data.type === 'bun' ? null : dragRef} className={`${style.section} mb-4 mr-2`} style={{ border }}>
            {data.type === 'bun' ? <div className="mr-8"></div> : <div className="mr-2"><DragIcon type="primary" /></div>}
            <div ref={data.type === 'bun' ? null : dropTarget} className={isCart ? style.element_cart : isUp ? style.element_up : style.element_down}>
                <div className={style.left} onClick={handleClick}>
                    <img className={`${style.image} ml-6 mr-5`} src={data.image} alt={data.name} />
                    <p className={`${style.name} text text_type_main-default mr-5`}>{data.name}</p>
                </div>
                <div className={`${style.right} pr-8`}>
                    <div className={`${style.price} mr-5`}>
                        <p className="text text_type_digits-default">{data.price}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    {data.type === 'bun' ? <LockIcon type="secondary" /> : <DeleteIcon type="primary" onClick={deleteClick} />}
                </div>
            </div>
        </section>
    )
}

export default ListItem;