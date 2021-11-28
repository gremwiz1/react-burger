import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import style from './app.module.css';
import Modal from '../modal/modal';
import { getItems, getUser } from '../../services/actions/index';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ADDED_ITEM, DELETE_ITEM } from '../../services/actions/index';
import NotFound from '../not-found/not-found';
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import Profile from '../../pages/profile/profile';
import ProtectedRoute from '../protected-route/protected-route';

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
    React.useEffect(() => {
        dispatch(getUser());
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
            <AppHeader />
            <Switch>
                <Route path="/" exact={true}>
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
                    <Login />
                </Route>
                <Route path="/register" exact={true}>
                    <Register />
                </Route>
                <Route path="/forgot-password" exact={true}>
                    <ForgotPassword />
                </Route>
                <Route path="/reset-password" exact={true}>
                    <ResetPassword />
                </Route>
                <ProtectedRoute path="/profile" exact={false}>
                    <Profile />
                </ProtectedRoute>
                <Route path="ingredients/:id" exact={true}>

                </Route>
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
        </div>
    )
}

export default App;