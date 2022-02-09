import React, { FC } from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import style from './app.module.css';
import Modal from '../modal/modal';
import { getItems, getUser, getNewToken } from '../../services/actions/index';
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
import Ingredient from '../../pages/ingredient/ingredient';
import { ITypeData, RootState } from '../../utils/types';
import FeedLenta from '../feed-lenta/feed-lenta';
import Order from '../order/order';
import { useDispatch, useSelector } from '../../services/hooks/redux-hooks';

const App: FC = () => {
    const location: any = useLocation();
    const history = useHistory();
    const isLoading = useSelector((store: RootState) => store.items.isLoading);
    const [isOpenModalOrder, setIsOpenModalOrder] = React.useState(false);
    const burgerIngredients = useSelector((store: RootState) => store.items.items);
    const ingredientsInBurger = useSelector((store: RootState) => store.cart.ingredients);
    const tokenSuccess = useSelector((store: RootState) => store.user.tokenSuccess);
    const dispatch = useDispatch();
    React.useEffect(() => {
        if (location.state) {
            location.state = undefined;
        }
    }, []);
    React.useEffect(() => {
        dispatch(getItems());
    }, [dispatch]);
    const refreshToken = Boolean(localStorage.getItem('refreshToken'));
    React.useEffect(() => {
        if (refreshToken) {
            dispatch(getNewToken());
        }
    }, [dispatch, refreshToken]);
    React.useEffect(() => {
        if (tokenSuccess) {
            dispatch(getUser());
        }
    }, [dispatch, tokenSuccess]);
    const handleDrop = (data: ITypeData) => {
        const itemId = data._id;
        const dropIngredient = burgerIngredients.find((item: ITypeData) => item._id === itemId);
        if (dropIngredient) {
            if (dropIngredient.type === 'bun') {
                const bunTypeInBurger = ingredientsInBurger.find((item: ITypeData) => item.type === 'bun');
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
    }
    const background = location.state?.background;
    const closeModalOrder = () => {
        setIsOpenModalOrder(false);
    }
    const closeModalIngredient = () => {
        history.push('/');
    }
    const closeModalOrderFromSocket = () => {
        history.push('/feed')
    }
    const closeModalOrderFromSocketInProfile = () => {
        history.push('/profile/orders')
    }
    return (

        <div className={style.app}>
            <AppHeader />
            <Switch location={background || location}>
                <Route path="/" exact={true}>
                    {isLoading ?
                        <main className={style.content}>
                            <DndProvider backend={HTML5Backend}>
                                <BurgerIngredients />
                                <BurgerConstructor onDropHandler={handleDrop} setIsOpenModalOrder={setIsOpenModalOrder} />
                            </DndProvider>
                        </main>
                        : ""}
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
                <ProtectedRoute path='/pofile/orders/:id' exact={true}>
                    <Order/>
                </ProtectedRoute>
                <ProtectedRoute path="/profile" exact={false}>
                    <Profile />
                </ProtectedRoute>
                <Route path="/ingredients/:id" exact={true}>
                    <Ingredient />
                </Route>
                <Route path="/feed" exact={true}>
                    <FeedLenta />
                </Route>
                <Route path="/feed/:id" exact={true}>
                    <Order />
                </Route>
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
            {background && (
                <>
                    <Route path="/ingredients/:id" exact={true}>
                        <Modal title="Детали ингредиента" closeModal={closeModalIngredient}>
                            <IngredientDetails />
                        </Modal>
                    </Route>
                    <Route path='/feed/:id' exact={true}>
                        <Modal title="" closeModal={closeModalOrderFromSocket}>
                            <Order />
                        </Modal>
                    </Route>
                    <ProtectedRoute path='/profile/orders/:id' exact={true}>
                        <Modal title="" closeModal={closeModalOrderFromSocketInProfile}>
                            <Order />
                        </Modal>
                    </ProtectedRoute>
                </>
            )}
            {isOpenModalOrder ? <Modal title="" closeModal={closeModalOrder}>
                <OrderDetails />
            </Modal> : ""}
        </div>
    )
}

export default App;