import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import style from './app.module.css';
import Modal from '../modal/modal';
import { getItems } from '../../services/actions/index';
import { useSelector, useDispatch } from 'react-redux';

function App() {
    const isLoading = useSelector(store => store.items.isLoading);
    const isOpenModalOrder = useSelector(store => store.order.isOpenModalOrder);
    const isOpenModalIngredient = useSelector(store => store.ingredient.isOpenModalIngredient);
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getItems());
    }, [dispatch]);

    return (
        <div className={style.app}>
            <AppHeader />
            {isLoading ?
                <main className={style.content}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </main>
                : ""}
            {isOpenModalOrder ? <Modal title="" >
                <OrderDetails />
            </Modal> : ""}
            {isOpenModalIngredient ? <Modal title="Детали ингредиента" >
                <IngredientDetails />
            </Modal> : ""}

        </div>
    )
}

export default App;