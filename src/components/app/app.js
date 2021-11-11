import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import style from './app.module.css';
import Modal from '../modal/modal';
import { getItems } from '../../services/actions/index';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ADDED_ITEM, DELETE_ITEM } from '../../services/actions/index';

function App() {
    const isLoading = useSelector(store => store.items.isLoading);
    const isOpenModalOrder = useSelector(store => store.order.isOpenModalOrder);
    const isOpenModalIngredient = useSelector(store => store.ingredient.isOpenModalIngredient);
    const burgerIngredients = useSelector(store => store.items.items);
    const ingredientsInBurger = useSelector(store => store.cart.ingredients);
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getItems());
    }, [dispatch]);
    const handleDrop = (data) => {
        const itemId = data._id;
        const dropIngredient = burgerIngredients.find((item) => item._id === itemId);
        if (dropIngredient.type === 'bun') {
            const bunTypeInBurger = ingredientsInBurger.find((item) => item.type === 'bun');
            if (bunTypeInBurger) {
                dispatch({ type: DELETE_ITEM, id: bunTypeInBurger._id });
                dispatch({ type: ADDED_ITEM, item: dropIngredient });
            }
            else {
                dispatch({ type: ADDED_ITEM, item: dropIngredient });
            }
        }
        else {
            dispatch({ type: ADDED_ITEM, item: dropIngredient });
        }
    }
    return (

        <div className={style.app}>
            <Router>
                <Switch>
                    <Route path="/" exact={true}>
                        <AppHeader />
                        {isLoading ?
                            <main className={style.content}>
                                <DndProvider backend={HTML5Backend}>
                                    <BurgerIngredients />
                                    <BurgerConstructor onDropHandler={handleDrop} />
                                </DndProvider>
                            </main>
                            : ""}
                        {isOpenModalOrder ? <Modal title="" >
                            <OrderDetails />
                        </Modal> : ""}
                        {isOpenModalIngredient ? <Modal title="Детали ингредиента" >
                            <IngredientDetails />
                        </Modal> : ""}
                    </Route>
                    <Route path="/login" exact={true}>

                    </Route>
                    <Route path="/register" exact={true}>

                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App;